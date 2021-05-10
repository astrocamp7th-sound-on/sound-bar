class CreatePodcasts < ActiveRecord::Migration[6.1]
  def change
    create_table :podcasts do |t|
      t.string :avatar
      t.string :name, null: false
      t.string :artist, null: false
      t.string :email, null: false
      t.string :language, null: false
      t.string :slug, null: false
      t.string :genres, null: false
      t.text :description
      t.string :subtitle
      t.string :weblink
      t.string :copyright
      t.string :explicit
      t.string :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
