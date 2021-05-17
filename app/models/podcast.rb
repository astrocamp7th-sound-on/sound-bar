class Podcast < ApplicationRecord
  # belongs_to :user
  has_many :episodes
  has_many :orders
  has_many :subscriptions

  validates :name, presence: true
  validates :artist, presence: true
  validates :email, presence: true
  validates :language, presence: true
  validates :slug, presence: true
  validates :genres, presence: true

  mount_uploader :cover, CoverUploader
end
