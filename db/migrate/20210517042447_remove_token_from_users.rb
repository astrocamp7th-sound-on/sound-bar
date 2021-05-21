class RemoveTokenFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :fb_token, :string
    remove_column :users, :google_uid, :string
    remove_column :users, :google_token, :string
  end
end
