require 'rails_helper'

RSpec.describe SynchroChannel, type: :channel do
  it 'successfully subscribes' do
    subscribe 
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from('synchro')
  end

  it 'relays component data' do
    subscribe
    expect { perform :receive, name: 'Layout' }.to broadcast_to('synchro')
  end
end
