Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  # 讓網址變成https://podcaster.我們的網域/
  constraints subdomain: 'podcaster' do
    get '/', to: 'pages#podcaster'

    # 然後登入後的CRUD網址變成https://podcaster.我們的網域/podcasts/:id/...
    resources :podcasts do
      resources :episodes, except: [:index] do
      end
    end
  end


  post '/donate_outcome', to: 'donations#donate_outcome'

  # 這邊是做給未登入使用者看到的頁面，subdomain原理同上，會變成https://player.我們的網域/p
  constraints subdomain: 'player' do
    get '/browse', to: 'p#browse'
    get '/:whatever', to: redirect('/browse')

    resources :p, only: [:show] do
      member do
        get '/donate', to: 'donations#new_donation'
        post '/donate', to: 'donations#donate!'
      end
      # get '/:id', to: 'p#show'
      resources :e, only: [:show] do
        resources :comments, shallow: true, only: [:create]
      end
    end

  end

  # 要擺在subdomain root的下面
  root 'pages#index'
end
