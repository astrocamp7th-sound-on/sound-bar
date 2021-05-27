class AddDonateTitleToPodcasts < ActiveRecord::Migration[6.1]
  def change
    add_column :podcasts, :donate_title, :string
  end
end
