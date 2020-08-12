class GridWidget < ApplicationRecord
  belongs_to :grid
  belongs_to :widget
  validates :position, numericality: { greater_than_or_equal_to: 0 }
end
