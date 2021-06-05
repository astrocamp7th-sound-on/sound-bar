class Api::V1::PodcastsController < Api::ApiController
  before_action :authenticate_user!

  def index
    @podcasts = Podcast.all
    # @podcasts = current_user.podcasts
  end

  def slug
    @podcasts = Podcast.all
  end






end
