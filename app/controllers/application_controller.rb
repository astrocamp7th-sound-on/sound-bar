class ApplicationController < ActionController::Base


  def after_sign_in_path_for(resource)
    podcasts_url(subdomain: "host")
  end

end
