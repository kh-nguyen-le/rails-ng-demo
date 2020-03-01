class SynchroChannel < ApplicationCable::Channel
  def subscribed
    stream_from component_channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast(component_channel, data)
  end

end