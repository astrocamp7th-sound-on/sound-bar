class SubscribeMailer <  ApplicationMailer
  def send_notification_to(users_id,episode_title, podcast_name)
    @users_id = users_id
    @title = episode_title
    @podcast_name = podcast_name
    @users_id.each do |id|
      @user = User.find(id)
      mail to: @user.email, subject:"你訂閱的頻道《#{@podcast_name}》新增單集#{@title}囉！"
    end
  end
end

