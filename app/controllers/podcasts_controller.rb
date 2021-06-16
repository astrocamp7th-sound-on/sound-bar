class PodcastsController < ApplicationController
  before_action :find_podcast, only: [:info, :update, :destroy, :dashboard, :music, :donate]
  before_action :authenticate_user!
  

  def index
    @podcasts = Podcast.order(id: :desc).page(params[:page]).per(12)
    @podcast = Podcast.new
    @episode = Episode.new
  end

  def create
    @podcast = Podcast.new(podcast_params)
    @podcast.x = podcast_params["x"]
    @podcast.y = podcast_params["y"]
    @podcast.width = podcast_params["width"]
    @podcast.height = podcast_params["height"]
    if @podcast.save
      redirect_to podcasts_path, notice: "新增節目成功"
    else
      redirect_to podcasts_path, notice: "新增節目失敗"
    end
  end

  def info
  end

  def update
    cookies[:return_to_url] = request.referer
    @podcast.x = podcast_params["x"]
    @podcast.y = podcast_params["y"]
    @podcast.width = podcast_params["width"]
    @podcast.height = podcast_params["height"]
    if @podcast.update(podcast_params)
      redirect_to cookies[:return_to_url] || podcasts_path, notice: "編輯節目成功"
      cookies[:return_to_url] = nil
    else
      render :info
    end
  end

  def destroy
    @podcast.delete
    redirect_to podcasts_path, notice: "刪除節目成功"
  end

  def dashboard
  end

  def music
  end

  def donate
  end

  private
  def podcast_params
    params.require(:podcast).permit(:avatar, :name, :artist, :email, :language, :slug, :genres, :description, :subtitle, :weblink, :copyright, :explicit, :status, :cover, :x, :y, :width, :height, :donate_title).merge({user: current_user})
  end



  def find_podcast
    @podcast = Podcast.includes(:episodes).find_by(random_url: params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to podcasts_path, notice: "找不到節目"
  end

end
