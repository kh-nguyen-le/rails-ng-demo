class CreateWidgets < ActiveRecord::Migration[5.2]
  def change
    create_table :widgets do |t|
      t.string :name
      t.jsonb :results
      t.jsonb :config

      t.timestamps
    end
  end
end
