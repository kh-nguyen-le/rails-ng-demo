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