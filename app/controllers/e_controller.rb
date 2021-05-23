class EController < ApplicationController
  def show
    @podcast = Podcast.find_by(random_url: params[:p_id])
    @podcast = Podcast.find_by!(slug: params[:p_id]) if @podcast.nil?
    rescue ActiveRecord::RecordNotFound
      redirect_to browse_path, notice: "找不到節目"
      
    @episode = Episode.find_by!(random_url: params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to p_path(@podcast.random_url), notice: "找不到單集"
  end
end
