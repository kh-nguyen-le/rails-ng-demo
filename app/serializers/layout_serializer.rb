class LayoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :background, :duration
  has_many :grids
end
