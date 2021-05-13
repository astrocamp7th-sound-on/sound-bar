class RemoveUserIdFromPodcasts < ActiveRecord::Migration[6.1]
  def change
    remove_column :podcasts, :user_id
  end
end
