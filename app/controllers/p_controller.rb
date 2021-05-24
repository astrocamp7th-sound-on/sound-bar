class PController < ApplicationController
  def browse
    @podcasts = Podcast.all
  end

  def show
    @podcast = Podcast.find(params[:id])
    @episodes = @podcast.episodes
  end
end
