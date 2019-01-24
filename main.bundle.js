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

	// This file is in the entry point in your webpack config.

	function submitLocation() {
	  var _this = this;

	  var location = document.getElementById("location").value;
	  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/forecast?location=" + location;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (response) {
	    _this.showWeather(response);
	  });
	}

	function showWeather(response) {
	  document.getElementById("searched_location").innerHTML = 'Location: ' + response['data']['attributes']['location'].toUpperCase();
	  document.getElementById("time").innerHTML = response['data']['attributes']['time'];
	  var temp = response['data']['attributes']['today']['current_temp'];
	  document.getElementById("current_temp").innerHTML = 'Current temp: ' + Math.round(temp) + '&deg';
	  document.getElementById("current_summary").innerHTML = response['data']['attributes']['today']['current_summary'];
	  document.getElementById("1hour").innerHTML = response['data']['attributes']['hourly'][0]['hour'];
	  document.getElementById("1temp").innerHTML = response['data']['attributes']['hourly'][0]['temp'] + '&deg';
	  document.getElementById("1icon").innerHTML = response['data']['attributes']['hourly'][0]['icon'];
	  document.getElementById("2hour").innerHTML = response['data']['attributes']['hourly'][1]['hour'];
	  document.getElementById("2temp").innerHTML = response['data']['attributes']['hourly'][1]['temp'] + '&deg';
	  document.getElementById("2icon").innerHTML = response['data']['attributes']['hourly'][1]['icon'];
	  document.getElementById("3hour").innerHTML = response['data']['attributes']['hourly'][2]['hour'];
	  document.getElementById("3temp").innerHTML = response['data']['attributes']['hourly'][2]['temp'] + '&deg';
	  document.getElementById("3icon").innerHTML = response['data']['attributes']['hourly'][2]['icon'];
	  document.getElementById("4hour").innerHTML = response['data']['attributes']['hourly'][3]['hour'];
	  document.getElementById("4temp").innerHTML = response['data']['attributes']['hourly'][3]['temp'] + '&deg';
	  document.getElementById("4icon").innerHTML = response['data']['attributes']['hourly'][3]['icon'];
	  document.getElementById("5hour").innerHTML = response['data']['attributes']['hourly'][4]['hour'];
	  document.getElementById("5temp").innerHTML = response['data']['attributes']['hourly'][4]['temp'] + '&deg';
	  document.getElementById("5icon").innerHTML = response['data']['attributes']['hourly'][4]['icon'];
	  document.getElementById("6hour").innerHTML = response['data']['attributes']['hourly'][5]['hour'];
	  document.getElementById("6temp").innerHTML = response['data']['attributes']['hourly'][5]['temp'] + '&deg';
	  document.getElementById("6icon").innerHTML = response['data']['attributes']['hourly'][5]['icon'];
	  document.getElementById("7hour").innerHTML = response['data']['attributes']['hourly'][6]['hour'];
	  document.getElementById("7temp").innerHTML = response['data']['attributes']['hourly'][6]['temp'] + '&deg';
	  document.getElementById("7icon").innerHTML = response['data']['attributes']['hourly'][6]['icon'];
	  document.getElementById("8hour").innerHTML = response['data']['attributes']['hourly'][7]['hour'];
	  document.getElementById("8temp").innerHTML = response['data']['attributes']['hourly'][7]['temp'] + '&deg';
	  document.getElementById("8icon").innerHTML = response['data']['attributes']['hourly'][7]['icon'];
	  document.getElementById("1_5day").innerHTML = response['data']['attributes']['five_day'][0]['day'];
	  document.getElementById("1_5icon").innerHTML = response['data']['attributes']['five_day'][0]['icon'];
	  var low_1 = response['data']['attributes']['five_day'][0]['low'] + '&deg';
	  var high_1 = response['data']['attributes']['five_day'][0]['high'] + '&deg';
	  document.getElementById("1_5temp").innerHTML = low_1 + '/' + high_1;
	  document.getElementById("1_5rain").innerHTML = response['data']['attributes']['five_day'][0]['rain_chance'];
	  document.getElementById("2_5day").innerHTML = response['data']['attributes']['five_day'][1]['day'];
	  document.getElementById("2_5icon").innerHTML = response['data']['attributes']['five_day'][1]['icon'];
	  var low_2 = response['data']['attributes']['five_day'][1]['low'] + '&deg';
	  var high_2 = response['data']['attributes']['five_day'][1]['high'] + '&deg';
	  document.getElementById("2_5temp").innerHTML = low_2 + '/' + high_2;
	  document.getElementById("2_5rain").innerHTML = response['data']['attributes']['five_day'][1]['rain_chance'];
	  document.getElementById("3_5day").innerHTML = response['data']['attributes']['five_day'][2]['day'];
	  document.getElementById("3_5icon").innerHTML = response['data']['attributes']['five_day'][2]['icon'];
	  var low_3 = response['data']['attributes']['five_day'][2]['low'] + '&deg';
	  var high_3 = response['data']['attributes']['five_day'][2]['high'] + '&deg';
	  document.getElementById("3_5temp").innerHTML = low_3 + '/' + high_3;
	  document.getElementById("3_5rain").innerHTML = response['data']['attributes']['five_day'][2]['rain_chance'];
	  document.getElementById("4_5day").innerHTML = response['data']['attributes']['five_day'][3]['day'];
	  document.getElementById("4_5icon").innerHTML = response['data']['attributes']['five_day'][3]['icon'];
	  var low_4 = response['data']['attributes']['five_day'][3]['low'] + '&deg';
	  var high_4 = response['data']['attributes']['five_day'][3]['high'] + '&deg';
	  document.getElementById("4_5temp").innerHTML = low_4 + '/' + high_4;
	  document.getElementById("4_5rain").innerHTML = response['data']['attributes']['five_day'][3]['rain_chance'];
	  document.getElementById("5_5day").innerHTML = response['data']['attributes']['five_day'][4]['day'];
	  document.getElementById("5_5icon").innerHTML = response['data']['attributes']['five_day'][4]['icon'];
	  var low_5 = response['data']['attributes']['five_day'][4]['low'] + '&deg';
	  var high_5 = response['data']['attributes']['five_day'][4]['high'] + '&deg';
	  document.getElementById("5_5temp").innerHTML = low_5 + '/' + high_5;
	  document.getElementById("5_5rain").innerHTML = response['data']['attributes']['five_day'][4]['rain_chance'];
	}

/***/ })
/******/ ]);
