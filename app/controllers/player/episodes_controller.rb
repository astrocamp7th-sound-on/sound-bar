class Player::EpisodesController < ApplicationController
  def show
    @podcast = Podcast.find_by(random_url: params[:player_podcast_id])
    @podcast = Podcast.find_by!(slug: params[:player_podcast_id]) if @podcast.nil?
    @episode = Episode.find_by!(random_url: params[:id])
    @comment = @episode.comments.new
    @comments = @episode.comments.order(id: :desc).includes(:user)

    rescue ActiveRecord::RecordNotFound
      redirect_to browse_path, notice: "找不到節目或單集"

  end
end
