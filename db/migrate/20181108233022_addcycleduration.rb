class Addcycleduration < ActiveRecord::Migration[5.2]
  def change
    add_column :layouts, :duration, :integer
  end
end
