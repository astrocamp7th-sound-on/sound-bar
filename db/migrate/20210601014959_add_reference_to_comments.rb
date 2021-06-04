class AddReferenceToComments < ActiveRecord::Migration[6.1]
  def change
    add_reference :comments, :comments, index: true
  end
end
