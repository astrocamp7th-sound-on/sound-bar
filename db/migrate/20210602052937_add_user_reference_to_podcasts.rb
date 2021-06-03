class AddUserReferenceToPodcasts < ActiveRecord::Migration[6.1]
  def change
    add_reference :podcasts, :user, foreign_key: true
  end
end
