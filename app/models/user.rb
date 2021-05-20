class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  has_many :podcasts
  has_many :orders
  has_many :subscriptions
  has_many :comments



# ref:https://cindyliu923.medium.com/rails-devise-google-fecebook%E7%99%BB%E5%85%A5%E5%AF%A6%E4%BD%9C-ebfb3170b0a8

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(:token => access_token.credentials.token, :uid => access_token.uid).first    
    if user
      return user
    else
      # 已使用devise註冊後用第三方登入
      registered_user = User.where(:email => data["email"]).first
      if registered_user
        registered_user.username = access_token.info.name
        registered_user.uid = access_token.uid
        registered_user.token = access_token.credentials.token
        registered_user.save!
        return registered_user
      else
        user = User.create(
          username: access_token.info.name,
          email: data["email"],
          password: Devise.friendly_token[0,20],
          token: access_token.credentials.token,
          uid: access_token.uid
        )
      end
    end
  end
end
