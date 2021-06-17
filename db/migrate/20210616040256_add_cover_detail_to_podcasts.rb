class AddCoverDetailToPodcasts < ActiveRecord::Migration[6.1]
  def change
    add_column :podcasts, :x, :string
    add_column :podcasts, :y, :string
    add_column :podcasts, :width, :string
    add_column :podcasts, :height, :string
  end
end
