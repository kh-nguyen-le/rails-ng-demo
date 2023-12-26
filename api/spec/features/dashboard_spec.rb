require 'rails_helper'

RSpec.feature 'Dashboards', js: true do
  context 'with existing components' do
     
    xit 'should load by UI navigation' do
      visit '/'
      dash_button = find_button('dashboard')
      expect(dash_button.text).to have_content 'dashboard'
      dash_button.click
      click_on 'dash-1'
      expect(page).to have_content 'Dashboard'
    end
  
    xit 'should navigate through the drawer' do
      visit '/'
      drawer_button = find_button('drawer')
      expect(drawer_button.text).to have_content 'view_sidebar'
      drawer_button.click
      click_on 'Layouts'
      click_on 'drawer-1'
      expect(page).to have_content 'Dashboard'
    end

  end
end
