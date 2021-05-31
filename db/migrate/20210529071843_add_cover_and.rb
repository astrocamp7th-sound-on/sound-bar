class AddCoverAnd < ActiveRecord::Migration[6.1]
  def change
    add_column :episodes, :cover, :string
    add_column :episodes, :artist, :string
  end
end
