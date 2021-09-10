class SynchroChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'synchro'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def receive(data)
    ActionCable.server.broadcast('synchro', data)
  end
end
