class ChangeDonatorDefaultAndAddStatusToDonations < ActiveRecord::Migration[6.1]
  def change
    add_column :donations, :status, :string
    change_column_default :donations, :donator, nil
  end
end
