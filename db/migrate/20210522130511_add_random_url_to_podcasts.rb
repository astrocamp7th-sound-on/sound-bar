class AddRandomUrlToPodcasts < ActiveRecord::Migration[6.1]
  def change
    add_column :podcasts, :random_url, :string
    add_index :podcasts, :random_url, unique: true
  end
end
