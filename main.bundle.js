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

	var api_key = config.API_KEY;

	var form = document.querySelector("form");
	form.addEventListener("submit", function (event) {
	  console.log("Saving value", form.elements.value.value);
	  event.preventDefault();
	});
	// This file is in the entry point in your webpack config.

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

	  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites?api_key=" + api_key;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (json_response) {
	    _this2.displayFavorites(json_response);
	  });
	}

	function showWeather(response) {
	  showCurrent(response);
	  showHourly(response);
	  showFiveDay(response);
	}

	function showCurrent(response) {
	  var current = response['data']['attributes'];
	  var location = current['location'].toUpperCase();
	  var time = current['time'];
	  var temp = current['today']['current_temp'];
	  var summary = current['today']['current_summary'];

	  var current_data = '<h3>' + location + '</h3>' + ("<img src=\"./weather_icons/" + summary + ".gif\" alt=\"" + summary + "\"") + '<br><h3>' + Math.round(temp) + '&#8457' + '</h3>';
	  var newDiv = document.createElement('div');
	  newDiv.innerHTML = current_data;
	  current_forecast.appendChild(newDiv);
	}

	function showHourly(response) {
	  var hourly = response['data']['attributes']['hourly'];
	  hourly.forEach(function (hour) {
	    var time = hour['hour'];
	    var temp = hour['temp'];
	    var icon = hour['icon'];

	    var hour_data = '<h3>' + time + '</h3>' + ("<img src=\"./weather_icons/" + icon + ".gif\" alt=\"" + icon + "\"") + '<br><h3>' + Math.round(temp) + '&#8457' + '</h3>';
	    var newDiv = document.createElement('div');
	    newDiv.className = 'weather_forecast';
	    newDiv.innerHTML = hour_data;
	    hourly_forecast.appendChild(newDiv);
	  });
	}

	function showFiveDay(response) {
	  var five_day = response['data']['attributes']['five_day'];
	  five_day.forEach(function (day) {
	    var time = day['day'];
	    var high = day['high'];
	    var low = day['low'];
	    var icon = day['icon'];
	    var rain_chance = day['rain_chance'];
	    var daily_data = '<h3>' + time + '</h3>' + ("<img src=\"./weather_icons/" + icon + ".gif\" alt=\"" + icon + "\"") + '<br>' + '<h4>' + Math.round(low) + '&#8457' + '/' + Math.round(high) + '&#8457' + '</h4><br>' + 'Rain Chance: ' + parseInt(Number(rain_chance) * 100) + '%';
	    var newDiv = document.createElement('div');
	    newDiv.className = 'weather_forecast';
	    newDiv.innerHTML = daily_data;
	    five_day_forecast.appendChild(newDiv);
	  });
	}

	function displayFavorites(response) {
	  var fav_cities = response['data']['attributes']['fav_cities_weather'];
	  fav_cities.forEach(function (city) {
	    var city_name = city['city'];
	    var summary = city['current_weather'][0]['current_summary'];
	    var current_temp = city['current_weather'][0]['current_temp'];
	    var humidity = city['current_weather'][0]['humidity'];
	    var low = city['current_weather'][0]['low'];
	    var high = city['current_weather'][0]['high'];
	    var fav_data = '<h2>' + city_name + '</h2>' + ("<img src=\"./weather_icons/" + summary + ".gif\" alt=\"" + summary + "\"") + '<br><h3>' + Math.round(current_temp) + '&#8457' + '</h3>' + 'Humidity: ' + parseInt(Number(humidity) * 100) + '%' + '<h4>' + Math.round(low) + '&#8457' + '/' + Math.round(high) + '&#8457' + '</h4>';
	    var newDiv = document.createElement('div');
	    newDiv.className = 'weather_forecast';
	    newDiv.innerHTML = fav_data;
	    favorited_cities.appendChild(newDiv);
	  });
	}

	function displayRegisterForm() {
	  clearClass("search");
	  clearClass("forecast");
	  clearClass("favorites");
	  var form = document.getElementById("register_form");
	  form.style.display = "block";
	}

	function clearClass(class_name) {
	  var elements = document.getElementsByClassName(class_name);
	  while (elements.length > 0) {
	    elements[0].remove();
	  }
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

/***/ })
/******/ ]);