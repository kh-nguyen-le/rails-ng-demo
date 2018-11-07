class Layout < ApplicationRecord
    has_many :layout_grids, dependent: :delete_all
    has_many :grids, through: :layout_grids
end
