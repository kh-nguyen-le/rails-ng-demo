require 'rails_helper'

RSpec.describe Layout, type: :model do
  subject do
    described_class.new(name: 'Layout', duration: 0)
  end
  it { is_expected.to be_valid }

  it 'is invalid without a name' do
    subject.name = ''
    expect(subject).to be_invalid
  end

  it 'has a non-negative or unset cycle duration' do
    subject.duration = -1000
    expect(subject).to_not be_valid
    subject.duration = nil
    expect(subject).to be_valid
  end
end
