class Podcast < ApplicationRecord
  # belongs_to :user
  has_many :episodes
  has_many :subscriptions
  has_many :donations

  validates :name, presence: true
  validates :artist, presence: true
  validates :email, presence: true
  validates :language, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :genres, presence: true

  mount_uploader :cover, CoverUploader
  before_create :generate_random_url

  enum genres: {
    Arts: "Arts",
    Business: "Business",
    Comedy: "Comedy",
    Education: "Education",
    Fiction: "Fiction",
    'Health & Fitness': "Health & Fitness",
    History: "History",
    'Kids & Family': "Kids & Family",
    Leisure: "Leisure",
    Music: "Music",
    News: "News",
    'Religion & Spirituality': "Religion & Spirituality",
    Science: "Science",
    'Society & Culture': "Society & Culture",
    Sports: "Sports",
    'Tv & Film': "TV & Film",
    Technology: "Technology"
  }

end
