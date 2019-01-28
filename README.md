# Sweater Weather Front End

## Introduction
This is a front end weather application that interacts with the "Sweater Weather" repository made at the end of Mod 3 while attending Turing. Visitors can search a location to display the current, hourly, and five day forecast of the searched city. Visitors can also Register and Login.  Once logged in, users can add a location to their favorites and display their favorited locations.  Users can also delete their favorited locations.

## Initial Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

From GitHub clone down repository using the following commands in terminal:
* `git clone git@github.com:jplao/sweater_weather_front_end.git`
* `cd sweater_weather_front_end`

## How to Use

### Running the Server Locally

To run the server locally run:
* `npm start`

In your browser visit:
* `http://localhost:8080/` to run your application.

### Home Page

When visitors first visit the page they will see buttons to register, login and an input field to enter their search location.
![Home Page](home.png)

### Showing Forecast for a Searched Location

#### Current Weather Forecast
When a location is searched only the current forecast will be displayed. The "current" tab will be highlighted and disabled. Current weather conditionas as well as a summary will be displayed. Hourly and Five Day forecast data can be seen by clicking on the corresponding tabs.
![Current forecast](current.png)

#### Hourly Weather Forecast
To display only the hourly forecast, click on "hourly".  The "hourly" tab will be highlighted and disabled, while the "current" and "five day" tabs will be enabled. Forecast information for the next 8 hours will be displayed.
![Hourly forecast](hourly.png)

#### Hourly Weather Forecast
To display only the five day forecast, click on "five day".  The "five day" tab will be highlighted and disabled, while the "current" and "hourly" tabs will be enabled. Forecast information for the next 5 days will be displayed.
![Five day forecast](five_day.png)

### Registering a New User
To create a new account, a visitor can click on the "Register" button located at the top right side of the window. A form will be displayed with fields for email, password, and password confirmation.  An alert will be displayed if any of the fields are left empty.  An alert will also display if the password and the password confirmation are not the same.
![Register form](register_form.png)

If valid information is inputted, a welcome message will be displayed.  The an input field to search a location, as well as buttons to add locations to favorites and display favorites will appear. The "register" and "log in" buttons will be replaced with a "log out" button.
![Logged in](logged_in.png)

### Logging in

To log in to an account that has already been created, a visitor can click on the "login" button.  A form will be displayed with fields for email and password.  
![Login form](login_form.png)

### Favorited Locations

Once logged in, a user can display their favorited locations by clicking on "show favorites".
![Favorite locations](favorites.png)

To add a location to favorites, enter a location in the input field and click "add to favorites".  The page will reload with the new location displayed along with all the previously favorited locations. A message will be displayed confirming the location the user has added to their favorites.
![Add a location](added_location.png)

Each favorited location has a button within their forecast information to delete the location from favorites. Clicking on the button will deleted the location from the users favorites.  A message will be displayed confirming the location the user has deleted from their favorites.
![Deleted location](deleted_location.png)

### Logging Out

Once a user logs out, a message will be displayed to confirm they have logged out.  The "log out" button will be replaced by the "register" and "login" buttons.  Any favorited forecast data that was being displayed while the user was logged is will be removed.  The buttons to add a location to favorites as well as display favorites will no longer be seen.
![Log Out](log_out.png)

## Known Issues

Due to Heroku servers being located in a different time zone, the displayed hours may be offset.  Once a location has been deleted from a user's list of favorited cities, it cannot be re-added to favorites.

## Core Contributors

* Jennifer Lao - Github: [jplao](https://www.github.com/jplao)

## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)

## GitHub Pages Setup

To view this project in production visit <https://jplao.github.io/sweater_weather_front_end/>.
