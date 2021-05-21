Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  # 這邊+path讓原先的controller#action不用變, 但網址前面會多個'/podcaster'
  resources :podcasts, path: '/podcaster/podcasts' do
    resources :episodes, except: [:index] do
    end
  end

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
