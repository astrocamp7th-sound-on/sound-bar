class MailWorker
  include Sidekiq::Worker

  def perform(user_id)
    @user = User.find(user_id)
    SubscribeMailer.send_notification_to(@user).deliver_now
  end
end
