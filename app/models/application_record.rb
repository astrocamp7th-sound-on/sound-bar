class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  private
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
