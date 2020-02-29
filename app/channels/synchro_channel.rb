class SynchroChannel < ApplicationCable::Channel
  def subscribed
    stream_from component_channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end  
end