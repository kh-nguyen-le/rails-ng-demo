require 'rails_helper'
require 'common_setup'

RSpec.describe LayoutGrid, type: :model do
  subject do
    described_class.new({
                          position: 0,
                          layout_id: -1,
                          grid_id: -1
                        })
  end

  it { is_expected.to be_invalid }

  context 'with existing layout and grid' do
    include_context 'layout'
    include_context 'grid'

    before(:example) do
      subject.grid_id = @grid.id
      subject.layout_id = @layout.id
    end

    it { is_expected.to be_valid }

    include_examples 'invalid position'
  end
end
