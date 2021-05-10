class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :avatar
      t.string :username

      t.timestamps
    end
  end
end
