Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  # 讓網址變成https://podcaster.我們的網域/
  constraints subdomain: 'podcasters' do
    get '/', to: 'pages#podcasters'

    # 然後登入後的CRUD網址變成https://podcaster.我們的網域/podcasts/:id/...
    resources :podcasts do
      resources :episodes, except: [:index] do
      end
    end
  end

  post '/donate_outcome', to: 'donations#donate_outcome'

  # 這邊是做給未登入使用者看到的頁面，subdomain原理同上，會變成https://player.我們的網域/p
  constraints subdomain: 'player' do
    get '/browse', to: 'player/podcasts#browse'
    get '/', to: redirect('/browse')
    get '/:whatever', to: redirect('/browse')

    scope module: :player do                  # 參考 https://qiita.com/ryosuketter/items/9240d8c2561b5989f049
      resources :podcasts, path: '/p', as: "player_podcast", only: [:show] do
        member do
          post :subscriptions
          get '/donate', to: 'donations#new_donation'
          post '/donate', to: 'donations#donate!'
        end
        resources :episodes, only: [:show], path: 'episodes' do
          resources :comments, shallow: true, only: [:create]
        end
      end
    end
  end

  # 要擺在subdomain root的下面
  root 'pages#index'
end
