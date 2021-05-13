class User < ApplicationRecord
  has_many :podcasts
  has_many :orders
  has_many :subscriptions
  has_many :comments
end
