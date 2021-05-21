class DropTableOrders < ActiveRecord::Migration[6.1]
  def change
    drop_table :orders, force: true
  end
end
