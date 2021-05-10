Rails.application.routes.draw do

  resources :podcasts do
    resources :episodes do
      resources :comments, shallow: true, only: [:create]
    end
  end



end
