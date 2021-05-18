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
  
  enum genres: {
    arts: "Arts", 
    business: "Business", 
    comedy: "Comedy", 
    education: "Education", 
    fiction: "Fiction", 
    healthfitness: "Health & Fitness", 
    history: "History", 
    kidsfamily: "Kids & Family", 
    leisure: "Leisure", 
    music: "Music", 
    news: "News", 
    religionspirituality: "Religion & Spirituality", 
    science: "Science", 
    societyculture: "Society & Culture", 
    sports: "Sports", 
    tvfilm: "TV & Film", 
    technology: "Technology"
  }


end
