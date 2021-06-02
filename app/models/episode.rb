class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments

  validates :title, presence: true
  validates :recording, presence: true
  validates :description, presence: true
  
  mount_uploader :recording, RecordingUploader
  include Randomable

end
