require "rails_helper"

RSpec.describe WidgetsController, type: :routing do
  describe "routing" do
    xit "routes to #index" do
      expect(get: "/widgets").to route_to("widgets#index")
    end

    xit "routes to #show" do
      expect(get: "/widgets/1").to route_to("widgets#show", id: "1")
    end


    xit "routes to #create" do
      expect(post: "/widgets").to route_to("widgets#create")
    end

    xit "routes to #update via PUT" do
      expect(put: "/widgets/1").to route_to("widgets#update", id: "1")
    end

    xit "routes to #update via PATCH" do
      expect(patch: "/widgets/1").to route_to("widgets#update", id: "1")
    end

    xit "routes to #destroy" do
      expect(delete: "/widgets/1").to route_to("widgets#destroy", id: "1")
    end
  end
end
