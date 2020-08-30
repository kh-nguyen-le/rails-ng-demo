require 'rails_helper'

RSpec.describe 'Landing Page', js: true do
  it 'loads the Angular app' do
    visit 'http://frontend:4200'
    expect(page).to have_content 'rails-ng'
  end
end
