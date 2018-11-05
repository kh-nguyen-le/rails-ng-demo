# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Widget.create!([
    { name: 'Placeholder Line Chart',
    config: {
    widgetType: 'line',
    showXAxis: 'true',
    showYAxis: 'true',
    gradient: 'false',
    showLegend: 'true',
    showXAxisLabel: 'true',
    xAxisLabel: 'Country',
    showYAxisLabel: 'true',
    yAxisLabel: 'Population'
    },
    results: [
      {
        name: 'Germany',
        series: [
          {
            name: '2010',
            value: 7300000
          },
          {
            name: '2011',
            value: 8940000
          }
        ]
      },
    
      {
        name: 'USA',
        series: [
          {
            name: '2010',
            value: 7870000
          },
          {
            name: '2011',
            value: 8270000
          }
        ]
      }
    ]
},
    { name: 'Placeholder Bar Chart',
    config: {
    widgetType: 'bar-vertical',
    showXAxis: 'true',
    showYAxis: 'true',
    gradient: 'false',
    showLegend: 'true',
    showXAxisLabel: 'true',
    xAxisLabel: 'Country',
    showYAxisLabel: 'true',
    yAxisLabel: 'Population'
    },
    results: [
      { name: 'Germany',
        value: 8940000
      },
      {
        name: 'USA',
        value: 5000000
      },
      {
        name: 'France',
        value: 7200000
      }

    ]
}
])

Layout.create!([
  {
    name: 'Placeholder Layout',
    background: 'white'
  }
])

Grid.create!([
  {
    name: 'Placeholder Grid',
    title: 'Placeholder Data',
    col: 2,
    size: '2:1'
  },
  {
    name: 'Singleton Grid',
    title: 'Placeholder Line Chart',
    col: 1,
    size: '2:1'
  },
  {
    name: 'Singleton Grid 2',
    title: 'Placeholder Bar Chart',
    col: 1,
    size: '2:1'
  }
])

LayoutGrid.create!([
  {
    position: 1,
    layout_id: 1,
    grid_id: 1
  },
  {
    position: 2,
    layout_id: 1,
    grid_id: 2
  },
  {
    position: 3,
    layout_id: 1,
    grid_id: 3
  }
])

GridWidget.create!([
  {
    position: 1,
    length: 1,
    width: 1,
    grid_id: 1,
    widget_id: 1
  },
  {
    position: 2,
    length: 1,
    width: 1,
    grid_id: 1,
    widget_id: 2
  },
  {
    position: 1,
    length: 1,
    width: 1,
    grid_id: 2,
    widget_id: 1
  },
  {
    position: 1,
    length: 1,
    width: 1,
    grid_id: 3,
    widget_id: 2
  }
])