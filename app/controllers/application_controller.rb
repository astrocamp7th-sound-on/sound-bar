class ApplicationController < ActionController::Base


  def after_sign_in_path_for(resource)
    podcasts_path
  end

  private
  def podcaster_find_podcast
    @podcast = Podcast.find_by(random_url: params[:id])
    @podcast = Podcast.find_by!(random_url: params[:podcast_id]) if @podcast.nil?
    rescue ActiveRecord::RecordNotFound
      redirect_to podcasts_path, notice: "找不到節目"
  end
  
end
