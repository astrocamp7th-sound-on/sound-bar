class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments

end
