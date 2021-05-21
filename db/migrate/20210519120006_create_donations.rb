class CreateDonations < ActiveRecord::Migration[6.1]
  def change
    create_table :donations do |t|
      t.string :donator, default: "fans"
      t.string :note
      t.integer :amount, null: false
      t.string :tradeno
      t.references :podcast, null: false, foreign_key: true

      t.timestamps
    end
  end
end
