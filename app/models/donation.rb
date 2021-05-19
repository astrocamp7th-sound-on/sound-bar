class Donation < ApplicationRecord
  belongs_to :podcast
  validates :amount, numericality: { only_integer: true, greater_than: 50, allow_nil: false }
end
