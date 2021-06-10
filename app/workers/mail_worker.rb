class MailWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(data)
    information = JSON.load(data)
    information.each_value {|value|
    SubscribeMailer.send_notification_to(information['subscribers_emails'], information['episode_title'],information['podcast_name']).deliver_now
  }
  end
end
