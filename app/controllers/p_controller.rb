class PController < ApplicationController
  def browse
    @podcasts = Podcast.all
  end

  def show
    @podcast = Podcast.find_by(random_url: params[:id])
    @podcast = Podcast.find_by!(slug: params[:id]) if @podcast.nil?
    rescue ActiveRecord::RecordNotFound
      redirect_to browse_path, notice: "找不到節目"

    @episodes = @podcast.episodes
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
