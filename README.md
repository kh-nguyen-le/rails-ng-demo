# README

<a href="https://rails-ng-demo.herokuapp.com/">demo</a>

A content management app for widget creation and display.

Widgets are grouped into Grids which are then grouped into Layouts. Each entity can be reused or destroyed independently.

Widget data must be JSON in the form of [{"name", "value"}] or [{"name", "series"["name", "value"]}]

Dashboard will now instantly update upon editor changes from another client.
To see this feature, 1. open two browsers with seperate cookie spaces (ie incognito mode).
2. Navigate to the dashboard view and editor view of the same layout.
3. Add, remove or shift components in editor.
4. Dashboard component will update instantaneously after each commit.

Application modules are now in Docker containers for a consistent testing environment.

To launch container network use `docker-compose up --build`

To run RSpec tests use `docker-compose run --rm backend rspec`

To run Jest test use `cd ./client && npx jest` or `docker-compose run --rm frontend npx jest`