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

end
