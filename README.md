# README

<a href="https://rails-ng-demo.herokuapp.com/">demo</a>

A content management app for widget creation and display.

Widgets are grouped into Grids which are then grouped into Layouts. Each entity can be reused or destroyed independently.

Widget data must be JSON in the form of [{"name", "value"}] or [{"name", "series"["name", "value"]}]

Dashboard will now instantly update upon editor changes from another client.
To see this feature, 1. open two browsers with seperate cookie spaces (ie igcognito mode).
2. Navigate to the dashboard view and editor view of the same layout.
3. Add, delete or shift grids in editor.
4. Dashboard component will update instantaneously after each commit.