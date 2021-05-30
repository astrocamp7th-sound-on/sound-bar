class SubscribeMailer <  ApplicationMailer
  def send_notification_to(user)
      mail to: user.email, subject:"你訂閱的頻道新增單集囉！"
    end
  end
end
