class CreateSubscriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :subscriptions do |t|
      t.references :podcast, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.time :status

      t.timestamps
    end
  end
end
