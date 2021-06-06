class AddRandomUrlToEpisodes < ActiveRecord::Migration[6.1]
  def change
    add_column :episodes, :random_url, :string
    add_index :episodes, :random_url, unique: true
  end
end
