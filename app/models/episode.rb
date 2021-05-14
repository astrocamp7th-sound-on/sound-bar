class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments
  # mount_uploader :cover, CoverUploader

  has_one_attached :audio

end
