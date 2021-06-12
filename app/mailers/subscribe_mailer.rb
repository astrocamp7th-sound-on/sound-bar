class SubscribeMailer <  ApplicationMailer
  def send_notification_to(subscribers_emails,episode_title, podcast_name)
    @title = episode_title
    @podcast_name = podcast_name
    subscribers_emails.each do |subscriber_email|
      @subscriber_email = subscriber_email
      mail to: subscriber_email, subject:"你訂閱的頻道《#{@podcast_name}》新增單集《#{@title} 》囉！"
    end
  end
end

