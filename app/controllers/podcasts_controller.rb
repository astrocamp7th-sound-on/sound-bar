class PodcastsController < ApplicationController
  before_action :find_podcast, only: [:edit, :update, :show, :destroy]

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

  private
  def podcast_params
    params.require(:podcast).permit(:avatar, :name, :artist, :email, :language, :slug, :genres, :description, :subtitle, :weblink, :copyright, :explicit, :status, :cover, :cover_cache)
  end

  def find_podcast
    @podcast = Podcast.find(params[:id])
  end
end
