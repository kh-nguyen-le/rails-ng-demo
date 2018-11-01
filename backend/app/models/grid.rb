class Grid < ApplicationRecord
    has_many :layout_grids
    has_many :layouts, through: :layout_grids
    has_many :grid_widgets
    has_many :widgets, through: :grid_widgets
end
