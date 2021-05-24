class AddIndexToPodcastsSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :podcasts, :slug, unique: true
  end
end
