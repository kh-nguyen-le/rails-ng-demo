RSpec.shared_context 'widget' do
  before(:context) do
    @widget = create(:widget)
  end
end

RSpec.shared_context 'grid' do
  before(:context) do
    @grid = create(:grid)
  end
end

RSpec.shared_context 'layout' do
  before(:context) do
    @layout = create(:layout)
  end
end

RSpec.shared_examples 'invalid position' do
  it 'is invalid with negative position' do
    subject.position = -1
    expect(subject).to be_invalid
  end
end
