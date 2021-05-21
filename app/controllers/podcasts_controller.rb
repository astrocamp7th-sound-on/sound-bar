class PodcastsController < ApplicationController
  require 'erb'
  include ERB::Util
  require 'digest'

  before_action :find_podcast, only: [:edit, :update, :show, :destroy, :new_donation, :donate!]
  skip_before_action :verify_authenticity_token, only: [:donate_outcome]


  def index
    @podcasts = Podcast.all
  end

  def new
    @podcast = Podcast.new
  end

  def create
    @podcast = Podcast.new(podcast_params)

    if @podcast.save
      redirect_to podcasts_path, notice: "新增節目成功"
    else
      render :new
    end
  end

  def show
    @episodes = @podcast.episodes
  end

  def edit
  end

  def update
    if @podcast.update(podcast_params)
      redirect_to podcasts_path, notice: "編輯節目成功"
    else
      render :edit
    end
  end

  def destroy
    @podcast.delete
    redirect_to podcasts_path, notice: "刪除節目成功"
  end

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
    @podcast = Podcast.find(params[:id])
  end

  def podcast_params
    params.require(:podcast).permit(:avatar, :name, :artist, :email, :language, :slug, :genres, :description, :subtitle, :weblink, :copyright, :explicit, :status, :cover)
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

    # 綠界的加密規則，將參數前後增加固定的HashKey及HashIV，依照參數英文順序排列
    hash_params = "HashKey=5294y06JbISpM5x9&ChoosePayment=Credit&ClientBackURL=http://localhost:3000/podcaster/podcasts/#{@podcast.id}&EncryptType=1&ItemName=贊助節目：#{@podcast.name}&MerchantID=2000132&MerchantTradeDate=#{trade_date}&MerchantTradeNo=#{trade_no}&PaymentType=aio&ReturnURL=https://ba7ed8f31f98.ngrok.io/p/donate_outcome&TotalAmount=#{@donation.amount}&TradeDesc=soundbar_donate&HashIV=v77hoKGq4kWxNNIS"

    # 根據綠界的加密規則，排列後要使用URLencode，之後轉成小寫，再將參數用SHA256加密並轉成大寫
    mac_value = (Digest::SHA256.hexdigest url_encode(hash_params).gsub("%20","+").downcase).upcase

    # 此網址為綠界測試網址
    ec_url = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"

    # 這邊是要傳給綠界的參數 Hash
    ec_params = { ChoosePayment: "Credit", ClientBackURL: "http://localhost:3000/podcaster/podcasts/#{@podcast.id}", EncryptType: "1", ItemName: "贊助節目：#{@podcast.name}", MerchantID: "2000132", MerchantTradeDate: "#{trade_date}", MerchantTradeNo: "#{trade_no}", PaymentType: "aio", ReturnURL: "https://ba7ed8f31f98.ngrok.io/p/donate_outcome", TotalAmount: "#{@donation.amount}", TradeDesc: "soundbar_donate", CheckMacValue: "#{mac_value}" }

    # 將上面的參數(含加密後檢查碼) POST 到綠界
    repost(ec_url, params: ec_params)
  end

  def receive_from_ecpay
    # 比對綠界參數的交易編號，尋找該筆贊助
    @donation = Donation.find_by(tradeno: params[:MerchantTradeNo])

    # 將綠界產生的交易編號登記到該筆贊助的欄位，並寫入資料庫
    @donation.update(ec_tradeno: "#{params["TradeNo"]}")

    # 如果綠界傳來的參數裡，RtnMsg訊息不是"交易成功"的話，就將該筆贊助的狀態由pending改為failed
    @donation.fail! if params[:RtnMsg] != "交易成功"

    # 綠界的加密規則，將參數前後增加固定的HashKey及HashIV，依照參數英文順序排列
    hash_params = "HashKey=5294y06JbISpM5x9&CustomField1=#{params["CustomField1"]}&CustomField2=#{params["CustomField2"]}&CustomField3=#{params["CustomField3"]}&CustomField4=#{params["CustomField4"]}&MerchantID=2000132&MerchantTradeNo=#{@donation.tradeno}&PaymentDate=#{params["PaymentDate"]}&PaymentType=Credit_CreditCard&PaymentTypeChargeFee=#{params["PaymentTypeChargeFee"]}&RtnCode=1&RtnMsg=交易成功&SimulatePaid=0&StoreID=&TradeAmt=#{@donation.amount}&TradeDate=#{params["TradeDate"]}&TradeNo=#{params["TradeNo"]}&HashIV=v77hoKGq4kWxNNIS"

    # 根據綠界的加密規則，排列後要使用URLencode，之後轉成小寫，再將參數用SHA256加密並轉成大寫
    mac_value = (Digest::SHA256.hexdigest url_encode(hash_params).gsub("%20","+").downcase).upcase

    # 如果綠界傳來的參數裡，RtnMsg訊息是"交易成功"，且檢查碼吻合的話，就將贊助狀態改為paid
    if mac_value == params[:CheckMacValue]
      @donation.pay!
      return "1|OK"
    # 如果綠界傳來的參數裡，RtnMsg訊息是"交易成功"，但檢查碼不吻合，那可能是遭到駭客攻擊
    else
      @donation.fail!
      return "0|ERR"
    end

    # 綠界傳回的參數長相範例
    # {"CustomField1"=>"", "CustomField2"=>"", "CustomField3"=>"", "CustomField4"=>"", "MerchantID"=>"2000132", "MerchantTradeNo"=>"21052103269", "PaymentDate"=>"2021/05/21 16:10:43", "PaymentType"=>"Credit_CreditCard", "PaymentTypeChargeFee"=>"20", "RtnCode"=>"1", "RtnMsg"=>"交易成功", "SimulatePaid"=>"0", "StoreID"=>"", "TradeAmt"=>"1000", "TradeDate"=>"2021/05/21 16:10:10", "TradeNo"=>"2105211610108401", "CheckMacValue"=>"A940AD4C0F9B8839A1CAF914547C7B7B9ECBA6501661CAD13BE0A3DA1DE33CC3"}
  end
end
