class Grid < ApplicationRecord
    has_many :layout_grids, dependent: :delete_all
    has_many :layouts, through: :layout_grids
    has_many :grid_widgets, dependent: :delete_all
    has_many :widgets, through: :grid_widgets
end
