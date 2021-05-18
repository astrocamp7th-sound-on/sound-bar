class RemoveCoverFromEpisodes < ActiveRecord::Migration[6.1]
  def change
    remove_column :episodes, :cover, :string
  end
end
