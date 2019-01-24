
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  console.log("Saving value", form.elements.value.value);
  debugger;
  event.preventDefault();
});
// This file is in the entry point in your webpack config.

function submitLocation(){
  var location = document.getElementById("location").value;
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/forecast?location=" + location;
  fetch(url).then(response => response.json()).then(json_response => {this.showWeather(json_response)});
}

function showWeather(response){
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

function displayRegisterForm(){
  clearClass("search");
  clearClass("forecast");
  var form = document.getElementById("register_form");
  form.style.display = "block";
}

function clearClass(class_name){
  const elements = document.getElementsByClassName(class_name);
  while (elements.length > 0) elements[0].remove();
}

function validateRegistration(){
  if( document.register.email.value == "" ) {
     alert( "Please provide your email!" );
     document.register.email.focus() ;
     return false;
  }
  if( document.register.psw.value == "" ) {
     alert( "Please enter your password" );
     document.register.psw.focus() ;
     return false;
  }
  if( document.register.psw_repeat.value == "" ) {
     alert( "Please enter your password confirmation" );
     document.register.psw_repeat.focus() ;
     return false;
  }
  if( document.register.psw_repeat.value != document.register.psw.value ) {
     alert( "Your password and password confirmation do not match.  Please try again." );
     document.register.psw.focus() ;
     return false;
  }
  return( true );
}
