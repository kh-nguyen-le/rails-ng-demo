require 'rails_helper'

RSpec.feature 'Dashboards', js: true do
  context 'with existing components' do
 
    it 'should load by url navigation' do
      visit '/'
      visit '/dash/1'
      expect(page).to have_content 'Dashboard'
      save_screenshot
    end

    it 'should load by UI navigation' do
      visit '/'
      dash_button = find_button('dashboard')
      expect(dash_button.text).to have_content 'dashboard'
      dash_button.click
      click_on 'dash-1'
      expect(page).to have_content 'Dashboard'
    end

    it 'should load the editor' do 
      visit '/'
      editor_button = find_button('editor')
      editor_button.click
      expect(editor_button.text).to have_content 'create'
      click_on 'Layouts'
      expect(page).to have_content 'Editor - Layouts'      
    end
  end
end
