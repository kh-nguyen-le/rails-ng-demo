class LayoutGrid < ApplicationRecord
  belongs_to :layout
  belongs_to :grid
  validates :position, numericality: { greater_than_or_equal_to: 0 }
end
