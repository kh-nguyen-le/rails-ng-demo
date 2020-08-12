class Grid < ApplicationRecord
  has_many :layout_grids, dependent: :delete_all
  has_many :layouts, through: :layout_grids
  has_many :grid_widgets, dependent: :delete_all
  has_many :widgets, -> { order 'grid_widgets.position' }, through: :grid_widgets
  validates_presence_of :name
  validates :col, numericality: { greater_than: 0 }
end
