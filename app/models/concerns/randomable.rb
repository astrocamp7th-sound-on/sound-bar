module Randomable

  extend ActiveSupport::Concern

  included do
    before_create :generate_random_url
  end

  def generate_random_url
    require 'securerandom'
    new_random_url = SecureRandom.uuid
    # 判斷該random_url是否重複
    while self.class.exists?(random_url: new_random_url)
      new_random_url = SecureRandom.uuid
    end
    self.random_url = new_random_url
  end

end
