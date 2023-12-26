class CreateGrids < ActiveRecord::Migration[5.2]
  def change
    create_table :grids do |t|
      t.string :name
      t.string :title
      t.integer :col
      t.string :size

      t.timestamps
    end
  end
end
