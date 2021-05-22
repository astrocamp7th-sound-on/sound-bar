Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  constraints subdomain: 'podcaster' do
    get '/', to: 'pages#podcaster'

    resources :podcasts do
      resources :episodes, except: [:index] do
      end
    end
  end
  
  # 要擺在subdomain root的下面
  root 'pages#index'

  # 這邊是做給未登入使用者看到的頁面
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
