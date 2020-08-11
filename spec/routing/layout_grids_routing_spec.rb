require "rails_helper"

RSpec.describe LayoutGridsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/layout_grids").to route_to("layout_grids#index")
    end

    it "routes to #show" do
      expect(get: "/layout_grids/1").to route_to("layout_grids#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/layout_grids").to route_to("layout_grids#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/layout_grids/1").to route_to("layout_grids#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/layout_grids/1").to route_to("layout_grids#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/layout_grids/1").to route_to("layout_grids#destroy", id: "1")
    end
  end
end
