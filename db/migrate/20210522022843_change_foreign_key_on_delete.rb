class ChangeForeignKeyOnDelete < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key "comments", "episodes"
    remove_foreign_key "comments", "users"
    remove_foreign_key "donations", "podcasts"
    remove_foreign_key "episodes", "podcasts"
    remove_foreign_key "subscriptions", "podcasts"
    remove_foreign_key "subscriptions", "users"

    add_foreign_key "comments", "episodes", on_delete: :cascade
    add_foreign_key "comments", "users", on_delete: :cascade
    add_foreign_key "donations", "podcasts", on_delete: :cascade
    add_foreign_key "episodes", "podcasts", on_delete: :cascade
    add_foreign_key "subscriptions", "podcasts", on_delete: :cascade
    add_foreign_key "subscriptions", "users", on_delete: :cascade
  end
end
