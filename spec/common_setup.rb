RSpec.shared_context 'widget' do
  before(:context) do
    config = {
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
    }
    @widget = Widget.create!(name: 'Widget', config: config)
  end
end

RSpec.shared_context 'grid' do
  before(:context) do
    @grid = Grid.create!(name: 'Grid', col: 1)
  end
end

RSpec.shared_context 'layout' do
  before(:context) do
    @layout = Layout.create!(name: 'Layout')
  end
end

RSpec.shared_examples 'invalid position' do
  it 'is invalid with negative position' do
    subject.position = -1
    expect(subject).to be_invalid
  end
end
