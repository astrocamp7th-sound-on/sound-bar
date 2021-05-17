# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_17_031101) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "episode_id", null: false
    t.bigint "user_id", null: false
    t.string "content"
    t.integer "star"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["episode_id"], name: "index_comments_on_episode_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "episode_uploaders", force: :cascade do |t|
    t.string "name"
    t.string "attachment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "episodes", force: :cascade do |t|
    t.string "audio"
    t.string "title", null: false
    t.text "description", null: false
    t.string "keyword"
    t.integer "season"
    t.integer "episode"
    t.boolean "explicit"
    t.string "status"
    t.bigint "podcast_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "episode_cover"
    t.string "recording"
    t.index ["podcast_id"], name: "index_episodes_on_podcast_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "podcast_id", null: false
    t.bigint "user_id", null: false
    t.integer "amount"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["podcast_id"], name: "index_orders_on_podcast_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "podcasts", force: :cascade do |t|
    t.string "avatar"
    t.string "name", null: false
    t.string "artist", null: false
    t.string "email", null: false
    t.string "language", null: false
    t.string "slug", null: false
    t.string "genres", null: false
    t.text "description"
    t.string "subtitle"
    t.string "weblink"
    t.string "copyright"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "explicit"
    t.string "cover"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "podcast_id", null: false
    t.bigint "user_id", null: false
    t.time "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["podcast_id"], name: "index_subscriptions_on_podcast_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "avatar"
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comments", "episodes"
  add_foreign_key "comments", "users"
  add_foreign_key "episodes", "podcasts"
  add_foreign_key "orders", "podcasts"
  add_foreign_key "orders", "users"
  add_foreign_key "subscriptions", "podcasts"
  add_foreign_key "subscriptions", "users"
end
