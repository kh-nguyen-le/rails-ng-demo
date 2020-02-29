module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def component_channel
      "#{channel_name}_#{params['type']}"
    end
  end
end
