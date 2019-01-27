var api_key = config.API_KEY;

function submitLocation(){
  var location = document.getElementById("location").value;
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/forecast?location=" + location;
  fetch(url).then(response => response.json()).then(json_response => {this.showWeather(json_response)});
}

function getFavorites(){
  var url = "https://sweater-weather-25661.herokuapp.com/api/v1/favorites?api_key=" + api_key
  fetch(url).then(response => response.json()).then(json_response => {this.displayFavorites(json_response)});
}

function showWeather(response){
  showCurrent(response);
  showHourly(response);
  showFiveDay(response);
}

function showCurrent(response){
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
  let leftDiv = document.createElement('div');
  leftDiv.innerHTML = left_current_data;
  leftDiv.className = ('weather_forecast');
  current_forecast.appendChild(leftDiv);

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
  let rightDiv = document.createElement('div');
  rightDiv.innerHTML = right_current_data;
  rightDiv.className = ('weather_forecast');
  current_forecast.appendChild(rightDiv);
}

function showHourly(response){
  const hourly = response['data']['attributes']['hourly']
  hourly.forEach(hour => {
    var time = hour['hour'];
    var temp = hour['temp'];
    temp = Math.round(temp);
    var icon = hour['icon'];

    var hour_data = `<h3>${time}</h3>
                <img src="./weather_icons/${icon}.gif" alt="${icon}">
                <br><h3><span> ${temp}&#8457 <span></h3>`;
    let newDiv = document.createElement('div');
  newDiv.className = ('weather_forecast');
  newDiv.innerHTML = hour_data;
  hourly_forecast.appendChild(newDiv);
  })
}

function showFiveDay(response){
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
    let newDiv = document.createElement('div');
    newDiv.className = ('weather_forecast');
    newDiv.innerHTML = daily_data;
    five_day_forecast.appendChild(newDiv);
  });
}

function displayFavorites(response){
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
                  <img src="./weather_icons/${summary}.gif" alt="${summary}">
                  <br><h2> ${current_temp}&#8457 </h2>
                  <span>Humidity:</span> ${humidity}%
                  <h4> ${low}&#8457 / ${high}&#8457 </h4>`;
  let newDiv = document.createElement('div');
  newDiv.className = ('weather_forecast');
  newDiv.innerHTML = fav_data;
  favorited_cities.appendChild(newDiv);
  })
}

function displayRegisterForm(){
  hideClass("search");
  hideClass("forecast");
  hideClass("favorites");
  var form = document.getElementById("register_form");
  form.style.display = "block";
}

function hideClass(class_name){
  $(`.${class_name}`).hide();
}

function showClass(class_name){
  $(`.${class_name}`).show();
}

function clearInput(element_id){
  document.getElementById(element_id).innerHTML = "";
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
  document.getElementById("welcome").innerHTML = `<h3>Welcome! ${payload.email}<h3>`;
  };
}

function storeSession(json){
  sessionStorage.setItem('api_key', `${json.data.attributes.api_key}`);
}

$('#register-btn').on('click', registerUser);
