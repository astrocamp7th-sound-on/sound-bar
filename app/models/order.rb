class Order < ApplicationRecord
  belongs_to :podcast
  belongs_to :user
end
