
unless Layout.exists?

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
                      yAxisLabel: 'Population',
                      autoScale: 'true'
                    },
                    results: [
                      {
                        name: 'Germany',
                        series: [
                          {
                            name: '2010',
                            value: 7_300_000
                          },
                          {
                            name: '2011',
                            value: 8_940_000
                          }
                        ]
                      },

                      {
                        name: 'USA',
                        series: [
                          {
                            name: '2010',
                            value: 7_870_000
                          },
                          {
                            name: '2011',
                            value: 8_270_000
                          }
                        ]
                      }
                    ] },
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
                        value: 8_940_000 },
                      {
                        name: 'USA',
                        value: 5_000_000
                      },
                      {
                        name: 'France',
                        value: 7_200_000
                      }

                    ] }
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
                        position: 0,
                        layout_id: 1,
                        grid_id: 1
                      },
                      {
                        position: 1,
                        layout_id: 1,
                        grid_id: 2
                      },
                      {
                        position: 2,
                        layout_id: 1,
                        grid_id: 3
                      }
                    ])

  GridWidget.create!([
                      {
                        position: 0,
                        length: 1,
                        width: 1,
                        grid_id: 1,
                        widget_id: 1
                      },
                      {
                        position: 1,
                        length: 1,
                        width: 1,
                        grid_id: 1,
                        widget_id: 2
                      },
                      {
                        position: 0,
                        length: 1,
                        width: 1,
                        grid_id: 2,
                        widget_id: 1
                      },
                      {
                        position: 0,
                        length: 1,
                        width: 1,
                        grid_id: 3,
                        widget_id: 2
                      }
                    ])
                    
end