class WidgetSerializer < ActiveModel::Serializer
  attributes :id, :name, :results, :config
  has_many :grids
end
