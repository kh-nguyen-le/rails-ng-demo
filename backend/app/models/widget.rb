class Widget < ApplicationRecord
    has_many :grid_widgets
    has_many :grids, through: :grid_widgets
end
