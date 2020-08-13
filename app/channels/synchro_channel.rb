class SynchroChannel < ApplicationCable::Channel
  def subscribed
    type = params[:type]
    id = params[:id]
    reject unless type == 'widget' || type == 'grid' || type == 'layout'
    reject unless id > 0
    stream_from component_channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def receive(data)
    ActionCable.server.broadcast(component_channel, data)
  end
end
