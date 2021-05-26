class EpisodesController < ApplicationController
  before_action :find_podcast, except: [:index]
  before_action :find_episode, only: [:redit, :update, :show, :destroy]

  def new
    @episode = Episode.new
  end

  def create
    @episode = @podcast.episodes.new(episode_params)
    if @episode.save
      redirect_to podcast_path(@podcast.random_url), notice: "新增單集成功"
    else
      render :new
    end
  end

  def show
  end

  def redit
  end

  def update
    if @episode.update(episode_params)
      redirect_to podcast_path(@podcast.random_url), notice: "編輯單集成功"
    else
      render :edit
    end
  end

  def destroy
    @episode.delete
    redirect_to podcast_path(@podcast.random_url), notice: "刪除單集成功"
  end

  private
  def episode_params
    params.require(:episode).permit(:audio, :title, :description, :keyword, :season, :episode, :explicit, :status, :recording)
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
