Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  #SoundBar for Podcasters 參考:https://podcasters.soundon.fm/
  get '/', to: 'pages#podcasters', constraints: { subdomain: 'podcasters'}

  constraints subdomain: 'host' do
    resources :podcasts, except: [:new, :edit, :show] do
      resources :episodes, except: [:new, :edit]
      member do
        get 'dashboard', to: 'podcasts#dashboard'     #數據總覽
        get 'info', to: 'podcasts#info'               #節目資訊
        get 'resource/music', to: 'podcasts#music'    #創作資源-音效襯樂
        get 'donate', to: 'podcasts#donate'           #創作營利
      end
    end

  end

  post '/donate_outcome', to: 'player/donations#donate_outcome'

  #聽眾報到-web馬上收聽 參考:https://player.soundon.fm/browse
  constraints subdomain: 'player' do
    get '/browse', to: 'player/podcasts#browse'
    get '/', to: redirect('/browse')
    get '/:whatever', to: redirect('/browse')

    scope module: :player do
      resources :podcasts, path: '/p', as: "player_podcast", only: [:show] do
        member do
          post :subscriptions
          get '/donate', to: 'donations#new_donation'
          post '/donate', to: 'donations#donate!'
        end
        resources :episodes, only: [:show], path: 'episodes' do
          resources :comments, only: [:create]
        end
      end
    end
  end

  # 要擺在subdomain root的下面
  root 'pages#index'

end
