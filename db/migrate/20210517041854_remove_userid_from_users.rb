class RemoveUseridFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :fb_uid, :string
  end
end
