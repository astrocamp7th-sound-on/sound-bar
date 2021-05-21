Rails.application.routes.draw do

  resources :podcasts, path: '/podcaster/podcasts' do
    resources :episodes, except: [:index] do
    end
  end

  resources :p, only: [:index, :show] do
    collection do
      post '/donate_outcome', to: 'podcasts#donate_outcome'
    end
    member do
      get '/donate', to: 'podcasts#new_donation'
      post '/donate', to: 'podcasts#donate!'
    end
    resources :e, only: [:show] do
      resources :comments, shallow: true, only: [:create]
    end
  end




end
