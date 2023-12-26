class Layout < ApplicationRecord
  has_many :layout_grids, dependent: :delete_all
  has_many :grids, -> { order 'layout_grids.position' }, through: :layout_grids
  validates_presence_of :name
  validates :duration, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
