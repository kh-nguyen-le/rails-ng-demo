require 'rails_helper'
require 'common_setup'

RSpec.describe GridWidget, type: :model do
  subject do
    described_class.new({
                          position: 0,
                          grid_id: -1,
                          widget_id: -1
                        })
  end

  it { is_expected.to be_invalid }

  context 'with existing grid and widget' do
    include_context 'widget'
    include_context 'grid'

    before(:example) do
      subject.grid_id = @grid.id
      subject.widget_id = @widget.id
    end

    it { is_expected.to be_valid }

    include_examples 'invalid position'
  end
end
