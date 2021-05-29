class Player::DonationsController < ApplicationController
  # 為了接收綠界 POST 回來的參數，關閉此驗證才能收到
  skip_before_action :verify_authenticity_token, only: [:donate_outcome]
  before_action :find_podcast, only: [:new_donation, :donate!]

  include ERB::Util

  def new_donation
    @donation = @podcast.donations.new
  end

  # POST 參數到綠界，此時使用者頁面會轉換到綠界填寫付款資訊
  def donate!
    @donation = @podcast.donations.new(donation_params)

    if @donation.save
      connect_ecpay
    else
      render :new_donation
    end
  end

  # 接受綠界的 POST 參數，更新 donation 的 status 和 ec_tradeno
  def donate_outcome
    receive_from_ecpay
  end

  private
  def find_podcast
    @podcast = Podcast.find_by!(random_url: params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to browse_path, notice: "找不到節目"
  end

  def donation_params
    params.require(:donation).permit(:donator, :note, :amount)
  end

  def connect_ecpay
    # 製作綠界所需參數 MerchantTradeDate
    trade_date = Time.now.strftime("%Y/%m/%d %H:%M:%S")

    # 我們自己製作的 donation 交易編號
    trade_no = Time.now.strftime("%y%m%d#{[*1..100].sample%100/10.floor}%3N#{[*1..100].sample%10}")

    # 將 donation 的交易編號寫入資料庫
    @donation.update(tradeno: "#{trade_no}")

    # 將容易更改的參數設為變數，未來更改時比較彈性
    client_back_url = "http://player.#{ENV["DOMAIN"]}/p/#{@podcast.random_url}" # 返回節目
    return_url = "https://#{ENV["NGROK_DOMAIN"]}/donate_outcome" # 接收綠界POST回來的參數用的URL

    # 綠界的加密規則，將參數前後增加固定的HashKey及HashIV，依照參數英文順序排列
    hash_params = "HashKey=#{ENV["EC_HASH_KEY"]}&ChoosePayment=Credit&ClientBackURL=#{client_back_url}&EncryptType=1&ItemName=贊助節目：#{@podcast.name}&MerchantID=#{ENV["MERCHANT_ID"]}&MerchantTradeDate=#{trade_date}&MerchantTradeNo=#{trade_no}&PaymentType=#{ENV["PAYMENT_TYPE"]}&ReturnURL=#{return_url}&TotalAmount=#{@donation.amount}&TradeDesc=soundbar_donate&HashIV=#{ENV["EC_HASH_IV"]}"

    # 根據綠界的加密規則，排列後要使用URLencode，之後轉成小寫，再將參數用SHA256加密並轉成大寫
    mac_value = (Digest::SHA256.hexdigest url_encode(hash_params).gsub("%20","+").downcase).upcase

    # 此網址為綠界測試網址
    ec_url = ENV["EC_URL"]

    # 這邊是要傳給綠界的參數 Hash
    ec_params = { ChoosePayment: "Credit", ClientBackURL: client_back_url, EncryptType: "1", ItemName: "贊助節目：#{@podcast.name}", MerchantID: ENV["MERCHANT_ID"], MerchantTradeDate: trade_date, MerchantTradeNo: trade_no, PaymentType: ENV["PAYMENT_TYPE"], ReturnURL: return_url, TotalAmount: "#{@donation.amount}", TradeDesc: "soundbar_donate", CheckMacValue: mac_value }

    # 將上面的參數(含加密後檢查碼) POST 到綠界
    repost(ec_url, params: ec_params)
  end

  def receive_from_ecpay
    # 比對綠界參數的交易編號，尋找該筆贊助
    @donation = Donation.find_by(tradeno: params[:MerchantTradeNo])

    # 將綠界產生的交易編號登記到該筆贊助的欄位，並寫入資料庫
    @donation.update(ec_tradeno: "#{params["TradeNo"]}")

    # 綠界的加密規則，將參數前後增加固定的HashKey及HashIV，依照參數英文順序排列
    hash_params = "HashKey=#{ENV["EC_HASH_KEY"]}&CustomField1=#{params["CustomField1"]}&CustomField2=#{params["CustomField2"]}&CustomField3=#{params["CustomField3"]}&CustomField4=#{params["CustomField4"]}&MerchantID=#{ENV["MERCHANT_ID"]}&MerchantTradeNo=#{@donation.tradeno}&PaymentDate=#{params["PaymentDate"]}&PaymentType=Credit_CreditCard&PaymentTypeChargeFee=#{params["PaymentTypeChargeFee"]}&RtnCode=1&RtnMsg=交易成功&SimulatePaid=0&StoreID=&TradeAmt=#{@donation.amount}&TradeDate=#{params["TradeDate"]}&TradeNo=#{params["TradeNo"]}&HashIV=#{ENV["EC_HASH_IV"]}"

    # 根據綠界的加密規則，排列後要使用URLencode，之後轉成小寫，再將參數用SHA256加密並轉成大寫
    mac_value = (Digest::SHA256.hexdigest url_encode(hash_params).gsub("%20","+").downcase).upcase

    # 如果綠界傳來的參數裡，RtnMsg訊息是"交易成功"，且檢查碼吻合的話，就將贊助狀態改為paid
    if mac_value == params["CheckMacValue"]
      @donation.pay!
      return "1|OK"
    else
      @donation.fail!
      return "0|ERR"
    end

    # 綠界傳回的參數長相範例
    # {"CustomField1"=>"", "CustomField2"=>"", "CustomField3"=>"", "CustomField4"=>"", "MerchantID"=>"2000132", "MerchantTradeNo"=>"21052103269", "PaymentDate"=>"2021/05/21 16:10:43", "PaymentType"=>"Credit_CreditCard", "PaymentTypeChargeFee"=>"20", "RtnCode"=>"1", "RtnMsg"=>"交易成功", "SimulatePaid"=>"0", "StoreID"=>"", "TradeAmt"=>"1000", "TradeDate"=>"2021/05/21 16:10:10", "TradeNo"=>"2105211610108401", "CheckMacValue"=>"A940AD4C0F9B8839A1CAF914547C7B7B9ECBA6501661CAD13BE0A3DA1DE33CC3"}
  end
end
