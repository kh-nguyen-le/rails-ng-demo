require 'rails_helper'

RSpec.describe SynchroChannel, type: :channel do
  it 'successfully subscribes' do
    subscribe type: 'widget', id: 1
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from('synchro_widget_1')
  end

  it 'rejects invalid types' do
    subscribe type: 'test', id: 1
    expect(subscription).to be_rejected
  end

  it 'rejects invalid ids' do
    subscribe type: 'grid', id: -1
    expect(subscription).to be_rejected
  end

  it 'relays component data' do
    subscribe type: 'layout', id: 1
    expect { perform :receive, name: 'Layout' }.to broadcast_to('synchro_layout_1')
  end
end
