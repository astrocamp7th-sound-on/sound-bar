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

  def donate!
    @donation = @podcast.donations.new(donation_params)

    if @donation.save
      connect_ecpay
    else
      render :new_donation
    end
  end

  def donate_outcome
    @donation = Donation.find_by(tradeno: params[:MerchantTradeNo])
    if params[:RtnMsg] = "交易成功"
      @donation.pay!
      return "1|OK"
    else
      @donation.fail!
      puts "0|err"
    end
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
    trade_date = Time.now.strftime("%Y/%m/%d %H:%M:%S")
    trade_no = Time.now.strftime("%y%m%d#{[*1..100].sample%100/10.floor}%3N#{[*1..100].sample%10}")
    @donation.update(tradeno: "#{trade_no}")
    hash_params = "HashKey=5294y06JbISpM5x9&ChoosePayment=ALL&ClientBackURL=http://localhost:3000/p&EncryptType=1&ItemName=贊助節目：#{@podcast.name}&MerchantID=2000132&MerchantTradeDate=#{trade_date}&MerchantTradeNo=#{trade_no}&PaymentType=aio&ReturnURL=https://ba7ed8f31f98.ngrok.io/p/donate_outcome&TotalAmount=#{@donation.amount}&TradeDesc=soundbar_donate&HashIV=v77hoKGq4kWxNNIS"

    @mac_value = (Digest::SHA256.hexdigest url_encode(hash_params).gsub("%20","+").downcase).upcase

    ec_url = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
    ec_params = { ChoosePayment: "ALL", ClientBackURL: "http://localhost:3000/p", EncryptType: "1", ItemName: "贊助節目：#{@podcast.name}", MerchantID: "2000132", MerchantTradeDate: "#{trade_date}", MerchantTradeNo: "#{trade_no}", PaymentType: "aio", ReturnURL: "https://ba7ed8f31f98.ngrok.io/p/donate_outcome", TotalAmount: "#{@donation.amount}", TradeDesc: "soundbar_donate", CheckMacValue: "#{@mac_value}" }

    repost(ec_url, params: ec_params)
  end
end
