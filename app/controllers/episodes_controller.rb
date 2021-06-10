class EpisodesController < ApplicationController
  before_action :find_podcast
  before_action :find_episode, only: [:edit, :update, :show, :destroy]
  before_action :authenticate_user!

  def index
    @episodes = @podcast.episodes.order(id: :desc).page(params[:page]).per(10)
    @episode = Episode.new
  end

  def create
    @episodes = @podcast.episodes.order(id: :desc).page(params[:page]).per(10)
    @episode = @podcast.episodes.new(episode_params)

    if @episode.save
      redirect_to podcast_episodes_path(@podcast.random_url, @episode.random_url), notice: "新增單集成功"
    else
      render :index
    end
  end

  def show
    @episode = Episode.find(params[:id])
  end

  def update
    if @episode.update(episode_params)
      redirect_to podcast_episode_path(@podcast.random_url, @episode.random_url), notice: "編輯單集成功"
    else
      render :show
    end
  end

  def destroy
    @episode.delete
    redirect_to podcast_episodes_path(@podcast.random_url), notice: "刪除單集成功"
  end

  private
  def episode_params
    params.require(:episode).permit(:title, :description, :keyword, :season, :episode, :explicit, :status, :recording, :cover, :artist)
  end

  def find_episode
    @episode = Episode.find_by!(random_url: params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to podcasts_path, notice: "找不到單集"
  end

  def find_podcast
    @podcast = Podcast.find_by!(random_url: params[:podcast_id])
    rescue ActiveRecord::RecordNotFound
      redirect_to podcasts_path, notice: "找不到節目"
  end
end
