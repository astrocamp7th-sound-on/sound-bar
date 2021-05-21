class AddEcTradenoToDonations < ActiveRecord::Migration[6.1]
  def change
    add_column :donations, :ec_tradeno, :string
  end
end
