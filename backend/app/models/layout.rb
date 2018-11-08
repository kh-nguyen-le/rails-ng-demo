class Layout < ApplicationRecord
    has_many :layout_grids, dependent: :delete_all
    has_many :grids, -> { order 'layout_grids.position' }, through: :layout_grids
end
