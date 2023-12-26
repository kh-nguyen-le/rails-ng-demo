require "rails_helper"

RSpec.describe LayoutsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/layouts").to route_to("layouts#index")
    end

    it "routes to #show" do
      expect(get: "/layouts/1").to route_to("layouts#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/layouts").to route_to("layouts#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/layouts/1").to route_to("layouts#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/layouts/1").to route_to("layouts#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/layouts/1").to route_to("layouts#destroy", id: "1")
    end
  end
end
