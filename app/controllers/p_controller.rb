class PController < ApplicationController


  def index
    @podcasts = Podcast.all
  end

  def show
    @podcast = Podcast.find(params[:id])
  end

  def subscriptions
    @podcast = Podcast.find(params[:id])
    if current_user.favorite_podcasts.exists?(@podcast.id)
      current_user.favorite_podcasts.destroy(@podcast)
      render json: {id:@podcast.id, status: 'removed' }
    else
      current_user.favorite_podcasts << @podcast
      render json: {id:@podcast.id, status: 'added' }
    end
  end

private

  def podcast_params
    params.require(:podcast).permit(:id,:avatar, :name, :artist)
  end
end
