class ChangeExplicitTypeOfPodcasts < ActiveRecord::Migration[6.1]
  def change
    remove_column :podcasts, :explicit, :string
    add_column :podcasts, :explicit, :boolean
  end
end
