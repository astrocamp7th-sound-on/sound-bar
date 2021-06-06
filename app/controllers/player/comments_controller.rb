class Player::CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @episode = Episode.find_by(random_url: params[:episode_id])
    @podcast = Podcast.find_by(random_url: params[:player_podcast_id])
    @comment = @episode.comments.new(comment_params)
    @comment.user = current_user

    if @comment.save
      # 執行 create.js.erb
      redirect_to player_podcast_episode_path(@podcast.random_url, @episode.random_url)
    else
      render 'player/episodes#show'
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :comments_id)
  end
end
