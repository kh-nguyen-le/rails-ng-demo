class CreateGridWidgets < ActiveRecord::Migration[5.2]
  def change
    create_table :grid_widgets do |t|
      t.integer :position
      t.integer :length
      t.integer :width
      t.integer :grid_id
      t.integer :widget_id

      t.timestamps
    end

    add_index :grid_widgets, [:grid_id, :widget_id]
  end
end
