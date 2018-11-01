class Layout < ApplicationRecord
    has_many :layout_grids
    has_many :grids, through: :layout_grids
end
