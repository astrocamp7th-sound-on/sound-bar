class Donation < ApplicationRecord
  belongs_to :podcast
  validates :amount, numericality: { only_integer: true, greater_than: 49, allow_nil: false }

  include AASM

  aasm column: :status do
    state :pending, initial: true
    state :paid, :failed

    event :pay do
      transitions from: :pending, to: :paid
    end

    event :fail do
      transitions from: :pending, to: :failed
    end
  end


end
