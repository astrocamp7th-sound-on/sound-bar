class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments

  mount_uploader :recording, RecordingUploader
  include Randomable

end
