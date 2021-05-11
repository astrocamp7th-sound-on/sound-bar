class AddCoverToEpisodes < ActiveRecord::Migration[6.1]
  def change
    add_column :episodes, :cover, :string
  end
end
