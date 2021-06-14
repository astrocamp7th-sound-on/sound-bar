class Api::V1::EpisodesController < Api::ApiController
  before_action :authenticate_user!

  def index
    @podcast = Podcast.find_by!(random_url: params[:podcast_id])
    @episodes = @podcast.episodes.order(id: :desc)
  end







end
