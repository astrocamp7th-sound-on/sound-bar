class MailWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(data)
    information = JSON.load(data)
    SubscribeMailer.send_notification_to(information['subscribers_emails'], information['episode_title'],information['podcast_name']).deliver_now
  end
end
