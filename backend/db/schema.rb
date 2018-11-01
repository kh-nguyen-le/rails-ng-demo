# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_25_164728) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "grid_widgets", force: :cascade do |t|
    t.integer "position"
    t.integer "length"
    t.integer "width"
    t.integer "grid_id"
    t.integer "widget_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["grid_id", "widget_id"], name: "index_grid_widgets_on_grid_id_and_widget_id"
  end

  create_table "grids", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.integer "col"
    t.integer "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "layout_grids", force: :cascade do |t|
    t.integer "position"
    t.integer "layout_id"
    t.integer "grid_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["layout_id", "grid_id"], name: "index_layout_grids_on_layout_id_and_grid_id"
  end

  create_table "layouts", force: :cascade do |t|
    t.string "name"
    t.string "background"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "widgets", force: :cascade do |t|
    t.string "name"
    t.jsonb "results"
    t.jsonb "config"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
