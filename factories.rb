FactoryBot.define do
    factory :widget do
        name { 'Widget' }
        config { { widgetType: 'line',
            showXAxis: 'true',
            showYAxis: 'true',
            gradient: 'false',
            showLegend: 'true',
            showXAxisLabel: 'true',
            xAxisLabel: 'Country',
            showYAxisLabel: 'true',
            yAxisLabel: 'Population',
            autoScale: 'true' } }
    end

    factory :grid do
        name { 'Grid' }
        col { 1 }
    end

    factory :layout do
        name { 'Layout' }
    end

    factory :grid_widget do
        grid
        widget
        position { 0 }
        grid_id { grid.id }
        widget_id { widget.id }
    end

    factory :layout_grid do
        layout
        grid
        position { 0 }
        layout_id { layout.id }
        grid_id { grid.id }
    end
end