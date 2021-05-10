Rails.application.routes.draw do
  resources :podcasts do
    resources :episodes, shallow: true, except: [:index] do
      resources :comments, shallow: true, only: [:create]
    end
  end


end
