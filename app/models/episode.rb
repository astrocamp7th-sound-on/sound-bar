class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments

  mount_uploader :recording, RecordingUploader
  before_create :generate_random_url

end
