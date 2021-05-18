class AddCoverToPodcasts < ActiveRecord::Migration[6.1]
  def change
    add_column :podcasts, :cover, :string
  end
end
