require 'rails_helper'

RSpec.describe Widget, type: :model do
  subject do
    described_class.new({ name: 'Widget',
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
                          ] })
  end

  it { is_expected.to have_attributes(name: 'Widget') }
  it 'has a widgetType' do
    expect(subject.config['widgetType']).to eq('line')
  end
  it 'has data loaded' do
    expect(subject.results).to be_truthy
  end

  it { is_expected.to be_valid }

  it 'is invalid without a name' do
    subject.name = nil
    expect(subject).to be_invalid
  end

  it 'is invalid without configuration' do
    subject.config = {}
    expect(subject).to be_invalid
  end
end
