Capybara.register_driver :selenium_remote_ff do |app|
  options = Selenium::WebDriver::Options.firefox

  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    options: options,
    url: "http://#{ENV['HUB']}:4444/wd/hub"
  )
end

Capybara.register_driver :selenium_remote_chrome do |app|
  options = Selenium::WebDriver::Options.chrome

  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    options: options,
    url: "http://#{ENV['HUB']}:4444/wd/hub"
  )
end

Capybara.javascript_driver = :selenium_remote_chrome
Capybara.app_host = 'http://frontend:4200'
Capybara.asset_host = 'http://api:3000'
Capybara.always_include_port = true

Capybara::Screenshot.register_driver(:selenium_remote_chrome) do |driver, path|
  driver.browser.save_screenshot(path)
end