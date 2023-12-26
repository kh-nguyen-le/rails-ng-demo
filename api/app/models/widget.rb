class Widget < ApplicationRecord
  has_many :grid_widgets, dependent: :delete_all
  has_many :grids, through: :grid_widgets
  validates_presence_of :name, :config
end
