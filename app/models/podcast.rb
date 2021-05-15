class Podcast < ApplicationRecord
  # belongs_to :user
  has_many :episodes
  has_many :orders
  has_many :subscriptions

  mount_uploader :cover, CoverUploader
end
