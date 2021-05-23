class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :comments

  mount_uploader :recording, RecordingUploader
  before_create :generate_random_url

  private
  def generate_random_url
    require 'securerandom'
    new_random_url = SecureRandom.uuid
    # 對Episode做判斷式看看是否已經存在random_url
    while Episode.exists?(random_url: new_random_url)
      new_random_url = SecureRandom.uuid
    end

    self.random_url = new_random_url
  end

end
