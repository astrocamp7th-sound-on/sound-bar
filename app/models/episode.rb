class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments

  has_one_attached :audio
end
