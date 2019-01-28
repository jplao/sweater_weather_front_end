function submitLocation(){
  var location = document.getElementById("location").value;
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/forecast?location=" + location;
  fetch(url).then(response => response.json()).then(json_response => {this.showWeather(json_response)});
}

function getFavorites(){
  var api_key = sessionStorage.getItem("api_key");
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites?api_key=" + api_key
  fetch(url).then(response => response.json()).then(json_response => {this.displayFavorites(json_response)});
  showClass("favorites");
}

function addFavorite(){
  var payload = {
    location: document.getElementById("location").value,
    api_key: sessionStorage.getItem("api_key"),
  }
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites";
  fetch(url,{
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .catch(error => console.error(error))
  .then(json_response => this.favoriteMessage(json_response));
}

function removeFavorite(){
  var payload = {
    location: event.target.id.toLowerCase(),
    api_key: sessionStorage.getItem("api_key"),
  }
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites";
  fetch(url,{
    method: 'DELETE',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => console.log(response))
  .catch(error => console.error(error));
  removeChildren('favorited_cities');
  deleteMessage(payload);
}

const loginUser = (event) => {
  event.preventDefault();
  var payload = {
    email: $("#login_email").val(),
    password: $("#login_psw").val(),
  }

  fetch(`https://sweater-weather-25661.herokuapp.com/api/v1/sessions`,{
    method: 'POST',
    headers: { 'Accept': 'application/json',
    'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .catch(error => console.error(error))
  .then(json_response => storeSession(json_response));
  hideClass("login");
  clearInput("location");
  showClass("search");
  changeMessage(`Welcome! ${payload.email}`);
  displayInline("favorites-btn");
  displayInline("add-favorite-btn");
  changeToLogOut();
}

const registerUser = (event) => {
  event.preventDefault();
  var payload = {
    email: $("#email").val(),
    password: $("#psw").val(),
    password_confirmation: $("#psw-repeat").val()
  }

  if (validateRegistration()) {
    fetch(`https://sweater-weather-25661.herokuapp.com/api/v1/users`,{
      method: 'POST',
      headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(json_response => storeSession(json_response));
    hideClass("register");
    clearInput("location");
    showClass("search");
    changeMessage(`Welcome! ${payload.email}`);
    displayInline("favorites-btn");
    displayInline("add-favorite-btn");
    changeToLogOut();
  };
}

function deleteMessage(payload){
  var location = payload.location.toUpperCase();
  changeMessage(`Deleted ${location} from your favorites`);
}

function removeChildren(elementId){
  var target_element = document.getElementById(elementId);
  while (target_element.firstChild) target_element.removeChild(target_element.firstChild);
}

function favoriteMessage(json){
  var location = json['data']['attributes']['location'];
  location = location.toUpperCase();
  changeMessage(`Added ${location} to your favorites`);
  getFavorites();
}

function showWeather(response){
  clearOutForecast();
  showClass("forecast");
  var location = response['data']['attributes']['location']
  location = location.toUpperCase();
  changeMessage(`Showing weather for ${location}`);
  setCurrent(response);
  setHourly(response);
  setFiveDay(response);
  displayInline("now-btn");
  disableButton("now-btn");
  displayInline("hourly-btn");
  displayInline("five-day-btn");
}

function displayCurrent(){
  displayGrid("current_forecast");
  displayNone("hourly_forecast");
  displayNone("five_day_forecast");
  disableButton("now-btn");
  enableButton("hourly-btn");
  enableButton("five-day-btn");
}

function displayFiveDay(){
  displayNone("current_forecast");
  displayNone("hourly_forecast");
  displayGrid("five_day_forecast");
  enableButton("now-btn");
  enableButton("hourly-btn");
  disableButton("five-day-btn");
}

function displayHourly(){
  displayNone("current_forecast");
  displayGrid("hourly_forecast");
  displayNone("five_day_forecast");
  enableButton("now-btn");
  disableButton("hourly-btn");
  enableButton("five-day-btn");
}

function displayGrid(id){
  document.getElementById(id).style.display= "grid";
}

function disableButton(button){
  document.getElementById(button).disabled = true;
}

function enableButton(button){
  document.getElementById(button).disabled = false;
}

function clearOutForecast(){
  removeChildren("current_forecast");
  removeChildren("hourly_forecast");
  removeChildren("five_day_forecast");
}

function setCurrent(response){
  const current = response['data']['attributes'];
  var location = current['location']
  location = location.toUpperCase();
  var time = current['time'];
  var temp = current['today']['current_temp'];
  temp = Math.round(temp);
  var summary = current['today']['current_summary'];
  var icon = current['today']['icon'];
  var left_current_data = `<h3>${location}</h3>
                ${summary}<br>
                <img src="./weather_icons/${icon}.gif" alt="${icon}">
                <h2> ${temp}&#8457</h2>`;
  appendData(left_current_data, "current_forecast");

  var high = current['today']['high'];
  var low = current['today']['low'];
  var feels_like = current['today']['feels_like'];
  var humidity = current['today']['humidity'];
  humidity = parseInt(Number(humidity)*100);
  var visibility = current['today']['visibility'];
  var uvindex = current['today']['uvindex'];
  var right_current_data = `<h3>Summary: </h3>
                            <span>High:</span> ${high} <br>
                            <span>Low:</span> ${low} <br>
                            <span>Humidity:</span> ${humidity}%<br>
                            <span>Visibility:</span> ${visibility} miles<br>
                            <span>UV Index:</span> ${uvindex}`
  appendData(right_current_data, "current_forecast");
}

function setHourly(response){
  const hourly = response['data']['attributes']['hourly']
  hourly.forEach(hour => {
    var time = hour['hour'];
    var temp = hour['temp'];
    temp = Math.round(temp);
    var icon = hour['icon'];

    var hour_data = `<h3>${time}</h3>
                <img src="./weather_icons/${icon}.gif" alt="${icon}">
                <br><h3><span> ${temp}&#8457 <span></h3>`;
    appendData(hour_data, "hourly_forecast");
  })
}

function setFiveDay(response){
  const five_day = response['data']['attributes']['five_day'];
  five_day.forEach(day => {
    var time = day['day'];
    var high = day['high'];
    high = Math.round(high);
    var low = day['low'];
    low = Math.round(low);
    var icon = day['icon'];
    var rain_chance = day['rain_chance'];
    rain_chance = parseInt(Number(rain_chance)*100)
    var daily_data = `<h3>${time}</h3>
                  <img src="./weather_icons/${icon}.gif" alt="${icon}"><br>
                  <h4>${low}&#8457 / ${high}&#8457'</h4><br>
                  <span>Rain Chance:</span> <br>${rain_chance}%`;
    appendData(daily_data, "five_day_forecast");
  });
}

function displayFavorites(response){
  removeChildren("favorited_cities");
  const fav_cities = response['data']['attributes']['fav_cities_weather']
  fav_cities.forEach(city => {
    var city_name = city['city'];
    city_name = city_name.toUpperCase();
    var summary = city['current_weather'][0]['current_summary'];
    var current_temp = city['current_weather'][0]['current_temp'];
    current_temp = Math.round(current_temp);
    var humidity = city['current_weather'][0]['humidity'];
    humidity = parseInt(Number(humidity)*100);
    var low = city['current_weather'][0]['low'];
    low = Math.round(low);
    var high = city['current_weather'][0]['high'];
    high = Math.round(high);
    var fav_data = `<h3>${city_name}</h3>
                  <h4>${summary}</h4>
                  <img src="./weather_icons/${summary}.gif" alt="${summary}">
                  <br><h2> ${current_temp}&#8457 </h2>
                  <span>Humidity:</span> ${humidity}%
                  <h4> ${low}&#8457 / ${high}&#8457 </h4>
                  <button class='button' id='${city_name}' onclick="removeFavorite()">Remove from Favorites</button>`;
  appendData(fav_data, "favorited_cities");
  })
}

function appendData(data, parent_id){
  let newDiv = document.createElement('div');
  newDiv.className = ('weather_forecast');
  newDiv.innerHTML = data;
  let parent_element = document.getElementById(parent_id);
  parent_element.appendChild(newDiv);
}

function displayRegisterForm(){
  displayForm("register", "login", "register_form");
}

function displayLoginForm(){
  displayForm("login", "register", "login_form");
}

function displayForm(show_class, hide_class, id){
  clearInput("welcome");
  hideClass("search");
  hideClass("forecast");
  hideClass("favorites");
  hideClass(hide_class);
  showClass(show_class);
  var form = document.getElementById(id);
  form.style.display = "block";
}

function hideClass(class_name){
  $(`.${class_name}`).hide();
}

function showClass(class_name){
  $(`.${class_name}`).show();
}

function displayInline(id){
  document.getElementById(id).style.display= "inline-block";
}

function displayNone(id){
  document.getElementById(id).style.display= "none";
}

function clearInput(element_id){
  document.getElementById(element_id).innerHTML = "";
}

function changeToLogOut(){
  displayNone("login-btn");
  displayNone("reg-btn");
  displayInline("logout-btn");
}

function changeToLogIn(){
  displayNone("logout-btn");
  displayInline("login-btn");
  displayInline("reg-btn");
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

function storeSession(json){
  sessionStorage.setItem('api_key', `${json.data.attributes.api_key}`);
}

function logoutUser(){
  sessionStorage.clear();
  changeToLogIn();
  changeMessage("Logged out successfully!");
  displayNone("favorites-btn");
  displayNone("add-favorite-btn");
  removeChildren('favorited_cities');
}

function changeMessage(message){
  document.getElementById("welcome").innerHTML = `<h3>${message}</h3>`
}

$('#register-btn').on('click', registerUser);
$('#submit-login-btn').on('click', loginUser);
