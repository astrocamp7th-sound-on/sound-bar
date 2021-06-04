class Comment < ApplicationRecord
  belongs_to :episode
  belongs_to :user
  has_many :replies, class_name: 'Comment', foreign_key: 'comments_id'
  belongs_to :original_comment, class_name: 'Comment', foreign_key: 'comments_id', optional: true

  validates :content, presence: true
end
