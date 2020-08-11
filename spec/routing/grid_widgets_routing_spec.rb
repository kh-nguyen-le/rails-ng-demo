require "rails_helper"

RSpec.describe GridWidgetsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/grid_widgets").to route_to("grid_widgets#index")
    end

    it "routes to #show" do
      expect(get: "/grid_widgets/1").to route_to("grid_widgets#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/grid_widgets").to route_to("grid_widgets#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/grid_widgets/1").to route_to("grid_widgets#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/grid_widgets/1").to route_to("grid_widgets#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/grid_widgets/1").to route_to("grid_widgets#destroy", id: "1")
    end
  end
end
