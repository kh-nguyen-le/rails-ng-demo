class CreateLayoutGrids < ActiveRecord::Migration[5.2]
  def change
    create_table :layout_grids do |t|
      t.integer :position
      t.integer :layout_id
      t.integer :grid_id

      t.timestamps
    end

    add_index :layout_grids, [:layout_id, :grid_id]
  end
end
