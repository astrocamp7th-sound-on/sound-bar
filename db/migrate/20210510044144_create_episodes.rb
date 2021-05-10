class CreateEpisodes < ActiveRecord::Migration[6.1]
  def change
    create_table :episodes do |t|
      t.string :audio
      t.string :title, null: false
      t.text :description, null: false
      t.string :keyword
      t.integer :season
      t.integer :episode
      t.boolean :explicit
      t.string :status
      t.references :podcast, null: false, foreign_key: true

      t.timestamps
    end
  end
end
