Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  #SoundBar for Podcasters 參考:https://podcasters.soundon.fm/
  get '/', to: 'pages#podcasters', constraints: { subdomain: 'podcasters'}

  constraints subdomain: 'host' do
    resources :podcasts, except: [:edit] do
      resources :episodes, except: [:show, :edit] do
                                     # episodes#index #單集列表
        collection do
          get '/:id', to: 'episodes#edit', as: 'edit' #編輯單集
        end
      end

      member do
        get 'dashboard', to: 'podcasts#dashboard'     #數據總覽
        get 'info', to: 'podcasts#edit'               #節目資訊
        get 'resource/music', to: 'podcasts#music'    #創作資源-音效襯樂
        get 'donate', to: 'podcasts#donate'           #創作營利
      end
    end

  end

  post '/donate_outcome', to: 'donations#donate_outcome'

  #聽眾報到-web馬上收聽 參考:https://player.soundon.fm/browse
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
