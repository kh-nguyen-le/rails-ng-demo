class Widget < ApplicationRecord
    has_many :grid_widgets, dependent: :delete_all
    has_many :grids, through: :grid_widgets
end
