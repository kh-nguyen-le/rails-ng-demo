Capybara.register_driver :selenium_remote_ff do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.firefox

  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    desired_capabilities: capabilities,
    url: 'http://selenium-hub:4444/wd/hub'
  )
end

Capybara.register_driver :selenium_remote_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome

  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    desired_capabilities: capabilities,
    url: 'http://selenium-hub:4444/wd/hub'
  )
end

Capybara.javascript_driver = :selenium_remote_chrome
Capybara.app_host = 'http://frontend:4200'
Capybara.asset_host = 'http://api:3000'