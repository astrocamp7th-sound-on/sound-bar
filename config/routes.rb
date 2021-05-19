Rails.application.routes.draw do

  resources :podcasts do
    member do
      get '/donate', to: 'podcasts#new_donation'
      post '/donate', to: 'podcasts#donate!'
    end
    resources :episodes do
      resources :comments, shallow: true, only: [:create]
    end
  end



end
