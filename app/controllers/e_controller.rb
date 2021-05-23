class EController < ApplicationController
  def show
    @episode = Episode.find(params[:id])
    @podcast = Podcast.find(params[:p_id])
    @comment = @episode.comments.new
    @comments = @episode.comments.order(id: :desc)
  end
end
