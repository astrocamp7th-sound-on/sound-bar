class CommentsController < ApplicationController
  before_action :authenticate_user!, only: :create
  skip_before_action :verify_authenticity_token

  def create
    @episode = Episode.find(params[:e_id])
    @podcast = Podcast.find(params[:p_id])
    @comment = @episode.comments.new(comment_params)
    @comments = @episode.comments.order(id: :desc)
    @comment.user = current_user

    if @comment.save
      # 執行 create.js.erb
      redirect_to p_e_path(@podcast, @episode)
    else
      render 'e/show'
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end
end
