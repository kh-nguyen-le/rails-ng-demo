require 'rails_helper'

RSpec.describe Grid, type: :model do
  subject do
    described_class.new({
                          name: 'Grid',
                          title: 'Singleton',
                          col: 1
                        })
  end

  it { is_expected.to have_attributes(name: 'Grid', col: 1) }

  it 'is invalid without a name' do
    subject.name = ''
    expect(subject).to be_invalid
  end

  it 'has at least 1 column' do
    subject.col = 0
    expect(subject).to_not be_valid
  end

  it 'has at most 10 columns' do
    subject.col = 100
    expect(subject).to_not be_valid
  end
end
