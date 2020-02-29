class GridSerializer < ActiveModel::Serializer
  attributes :id, :name, :title, :col, :size
  has_many :widgets
  has_many :layouts
end
