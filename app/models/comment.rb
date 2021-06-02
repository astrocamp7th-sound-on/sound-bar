class Comment < ApplicationRecord
  belongs_to :episode
  belongs_to :user
  has_many :replies, class_name: 'Comment', foreign_key: 'comment_id'
  belongs_to :original_comment, class_name: 'Comment', foreign_key: 'comment_id', optional: true
end
