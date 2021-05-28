class DropUnnecessaryColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :comments, :star
    remove_column :podcasts, :avatar
    remove_column :podcasts, :status
  end
end
