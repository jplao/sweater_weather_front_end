/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	function submitLocation() {
	  var _this = this;

	  var location = document.getElementById("location").value;
	  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/forecast?location=" + location;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (json_response) {
	    _this.showWeather(json_response);
	  });
	}

	function getFavorites() {
	  var _this2 = this;

	  var api_key = sessionStorage.getItem("api_key");
	  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites?api_key=" + api_key;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (json_response) {
	    _this2.displayFavorites(json_response);
	  });
	  showClass("favorites");
	}

	function addFavorite() {
	  var _this3 = this;

	  event.preventDefault();
	  var payload = {
	    location: document.getElementById("location").value,
	    api_key: sessionStorage.getItem("api_key")
	  };
	  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites";
	  fetch(url, {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  }).then(function (json_response) {
	    return _this3.favoriteMessage(json_response);
	  });
	}

	function removeFavorite() {
	  var payload = {
	    location: event.target.id.toLowerCase(),
	    api_key: sessionStorage.getItem("api_key")
	  };
	  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites";
	  fetch(url, {
	    method: 'DELETE',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return console.log(response);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	  removeChildren('favorited_cities');
	  deleteMessage(payload);
	}

	var loginUser = function loginUser(event) {
	  event.preventDefault();
	  var payload = {
	    email: $("#login_email").val(),
	    password: $("#login_psw").val()
	  };

	  fetch("https://sweater-weather-25661.herokuapp.com/api/v1/sessions", {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  }).then(function (json_response) {
	    return storeSession(json_response);
	  });
	  hideClass("login");
	  clearInput("location");
	  showClass("search");
	  changeMessage("Welcome! " + payload.email);
	  displayInline("favorites-btn");
	  displayInline("add-favorite-btn");
	  changeToLogOut();
	};

	var registerUser = function registerUser(event) {
	  event.preventDefault();
	  var payload = {
	    email: $("#email").val(),
	    password: $("#psw").val(),
	    password_confirmation: $("#psw-repeat").val()
	  };

	  if (validateRegistration()) {
	    fetch("https://sweater-weather-25661.herokuapp.com/api/v1/users", {
	      method: 'POST',
	      headers: { 'Accept': 'application/json',
	        'Content-Type': 'application/json' },
	      body: JSON.stringify(payload)
	    }).then(function (response) {
	      return response.json();
	    }).catch(function (error) {
	      return console.error(error);
	    }).then(function (json_response) {
	      return storeSession(json_response);
	    });
	    hideClass("register");
	    clearInput("location");
	    showClass("search");
	    changeMessage("Welcome! " + payload.email);
	    displayInline("favorites-btn");
	    displayInline("add-favorite-btn");
	    changeToLogOut();
	  };
	};

	function deleteMessage(payload) {
	  var location = payload.location.toUpperCase();
	  changeMessage("Deleted " + location + " from your favorites");
	}

	function removeChildren(elementId) {
	  var target_element = document.getElementById(elementId);
	  while (target_element.firstChild) {
	    target_element.removeChild(target_element.firstChild);
	  }
	}

	function favoriteMessage(json) {
	  var location = json['data']['attributes']['location'];
	  location = location.toUpperCase();
	  changeMessage("Added " + location + " to your favorites");
	  getFavorites();
	}

	function showWeather(response) {
	  clearOutForecast();
	  showClass("forecast");
	  var location = response['data']['attributes']['location'];
	  location = location.toUpperCase();
	  changeMessage("Showing weather for " + location);
	  setCurrent(response);
	  setHourly(response);
	  setFiveDay(response);
	  displayInline("now-btn");
	  disableButton("now-btn");
	  displayInline("hourly-btn");
	  displayInline("five-day-btn");
	}

	function displayCurrent() {
	  displayGrid("current_forecast");
	  displayNone("hourly_forecast");
	  displayNone("five_day_forecast");
	  disableButton("now-btn");
	  enableButton("hourly-btn");
	  enableButton("five-day-btn");
	}

	function displayFiveDay() {
	  displayNone("current_forecast");
	  displayNone("hourly_forecast");
	  displayGrid("five_day_forecast");
	  enableButton("now-btn");
	  enableButton("hourly-btn");
	  disableButton("five-day-btn");
	}

	function displayHourly() {
	  displayNone("current_forecast");
	  displayGrid("hourly_forecast");
	  displayNone("five_day_forecast");
	  enableButton("now-btn");
	  disableButton("hourly-btn");
	  enableButton("five-day-btn");
	}

	function displayGrid(id) {
	  document.getElementById(id).style.display = "grid";
	}

	function disableButton(button) {
	  document.getElementById(button).disabled = true;
	}

	function enableButton(button) {
	  document.getElementById(button).disabled = false;
	}

	function clearOutForecast() {
	  removeChildren("current_forecast");
	  removeChildren("hourly_forecast");
	  removeChildren("five_day_forecast");
	}

	function setCurrent(response) {
	  var current = response['data']['attributes'];
	  var location = current['location'];
	  location = location.toUpperCase();
	  var time = current['time'];
	  var temp = current['today']['current_temp'];
	  temp = Math.round(temp);
	  var summary = current['today']['current_summary'];
	  var icon = current['today']['icon'];
	  var left_current_data = "<h3>" + location + "</h3>\n                " + summary + "<br>\n                <img src=\"./weather_icons/" + icon + ".gif\" alt=\"" + icon + "\">\n                <h2> " + temp + "&#8457</h2>";
	  appendData(left_current_data, "current_forecast");

	  var high = current['today']['high'];
	  var low = current['today']['low'];
	  var feels_like = current['today']['feels_like'];
	  var humidity = current['today']['humidity'];
	  humidity = parseInt(Number(humidity) * 100);
	  var visibility = current['today']['visibility'];
	  var uvindex = current['today']['uvindex'];
	  var right_current_data = "<h3>Summary: </h3>\n                            <span>High:</span> " + high + " <br>\n                            <span>Low:</span> " + low + " <br>\n                            <span>Humidity:</span> " + humidity + "%<br>\n                            <span>Visibility:</span> " + visibility + " miles<br>\n                            <span>UV Index:</span> " + uvindex;
	  appendData(right_current_data, "current_forecast");
	}

	function setHourly(response) {
	  var hourly = response['data']['attributes']['hourly'];
	  hourly.forEach(function (hour) {
	    var time = hour['hour'];
	    var temp = hour['temp'];
	    temp = Math.round(temp);
	    var icon = hour['icon'];

	    var hour_data = "<h3>" + time + "</h3>\n                <img src=\"./weather_icons/" + icon + ".gif\" alt=\"" + icon + "\">\n                <br><h3><span> " + temp + "&#8457 <span></h3>";
	    appendData(hour_data, "hourly_forecast");
	  });
	}

	function setFiveDay(response) {
	  var five_day = response['data']['attributes']['five_day'];
	  five_day.forEach(function (day) {
	    var time = day['day'];
	    var high = day['high'];
	    high = Math.round(high);
	    var low = day['low'];
	    low = Math.round(low);
	    var icon = day['icon'];
	    var rain_chance = day['rain_chance'];
	    rain_chance = parseInt(Number(rain_chance) * 100);
	    var daily_data = "<h3>" + time + "</h3>\n                  <img src=\"./weather_icons/" + icon + ".gif\" alt=\"" + icon + "\"><br>\n                  <h4>" + low + "&#8457 / " + high + "&#8457'</h4><br>\n                  <span>Rain Chance:</span> <br>" + rain_chance + "%";
	    appendData(daily_data, "five_day_forecast");
	  });
	}

	function displayFavorites(response) {
	  removeChildren("favorited_cities");
	  var fav_cities = response['data']['attributes']['fav_cities_weather'];
	  fav_cities.forEach(function (city) {
	    var city_name = city['city'];
	    city_name = city_name.toUpperCase();
	    var summary = city['current_weather'][0]['current_summary'];
	    var current_temp = city['current_weather'][0]['current_temp'];
	    current_temp = Math.round(current_temp);
	    var humidity = city['current_weather'][0]['humidity'];
	    humidity = parseInt(Number(humidity) * 100);
	    var low = city['current_weather'][0]['low'];
	    low = Math.round(low);
	    var high = city['current_weather'][0]['high'];
	    high = Math.round(high);
	    var fav_data = "<h3>" + city_name + "</h3>\n                  <h4>" + summary + "</h4>\n                  <img src=\"./weather_icons/" + summary + ".gif\" alt=\"" + summary + "\">\n                  <br><h2> " + current_temp + "&#8457 </h2>\n                  <span>Humidity:</span> " + humidity + "%\n                  <h4> " + low + "&#8457 / " + high + "&#8457 </h4>\n                  <button class='button' id='" + city_name + "' onclick=\"removeFavorite()\">Remove from Favorites</button>";
	    appendData(fav_data, "favorited_cities");
	  });
	}

	function appendData(data, parent_id) {
	  var newDiv = document.createElement('div');
	  newDiv.className = 'weather_forecast';
	  newDiv.innerHTML = data;
	  var parent_element = document.getElementById(parent_id);
	  parent_element.appendChild(newDiv);
	}

	function displayRegisterForm() {
	  displayForm("register", "login", "register_form");
	}

	function displayLoginForm() {
	  displayForm("login", "register", "login_form");
	}

	function displayForm(show_class, hide_class, id) {
	  clearInput("welcome");
	  hideClass("search");
	  hideClass("forecast");
	  hideClass("favorites");
	  hideClass(hide_class);
	  showClass(show_class);
	  var form = document.getElementById(id);
	  form.style.display = "block";
	}

	function hideClass(class_name) {
	  $("." + class_name).hide();
	}

	function showClass(class_name) {
	  $("." + class_name).show();
	}

	function displayInline(id) {
	  document.getElementById(id).style.display = "inline-block";
	}

	function displayNone(id) {
	  document.getElementById(id).style.display = "none";
	}

	function clearInput(element_id) {
	  document.getElementById(element_id).innerHTML = "";
	}

	function changeToLogOut() {
	  displayNone("login-btn");
	  displayNone("reg-btn");
	  displayInline("logout-btn");
	}

	function changeToLogIn() {
	  displayNone("logout-btn");
	  displayInline("login-btn");
	  displayInline("reg-btn");
	}

	function validateRegistration() {
	  if (document.register.email.value == "") {
	    alert("Please provide your email!");
	    document.register.email.focus();
	    return false;
	  }
	  if (document.register.psw.value == "") {
	    alert("Please enter your password");
	    document.register.psw.focus();
	    return false;
	  }
	  if (document.register.psw_repeat.value == "") {
	    alert("Please enter your password confirmation");
	    document.register.psw_repeat.focus();
	    return false;
	  }
	  if (document.register.psw_repeat.value != document.register.psw.value) {
	    alert("Your password and password confirmation do not match.  Please try again.");
	    document.register.psw.focus();
	    return false;
	  }
	  return true;
	}

	function storeSession(json) {
	  sessionStorage.setItem('api_key', "" + json.data.attributes.api_key);
	}

	function logoutUser() {
	  sessionStorage.clear();
	  changeToLogIn();
	  changeMessage("Logged out successfully!");
	  displayNone("favorites-btn");
	  displayNone("add-favorite-btn");
	  removeChildren('favorited_cities');
	}

	function changeMessage(message) {
	  document.getElementById("welcome").innerHTML = "<h3>" + message + "</h3>";
	}

	$('#register-btn').on('click', registerUser);
	$('#submit-login-btn').on('click', loginUser);

/***/ })
/******/ ]);