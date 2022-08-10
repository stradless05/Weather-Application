apiCall("Paris");

current();

let button = document.getElementById("submit");
button.addEventListener("click", onButtonClick);

let fLink = document.getElementById("fLink");
let cLink = document.getElementById("cLink");
fLink.addEventListener("click", clickF);

function onButtonClick(event) {
  let search = document.getElementById("search");
  let city = search.value;
  apiCall(city);
  fLink.addEventListener("click", clickF);
  cLink.removeEventListener("click", clickC);
}
function apiCall(city) {
  let apiKey = "5f091c27ecd3875fabda53b65ecd4358";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showResponse);
}

function getForecast (coordinates) {
  let apiKey = '5f091c27ecd3875fabda53b65ecd4358';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showResponse(response) {
  let cityElement = document.getElementById("cityName");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.getElementById("looksLike");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let tempElement = document.getElementById("temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.getElementById("humidityElement");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windElement = document.getElementById("windElement");
  windElement.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} Km / H`;
  let feelsLikeElement = document.getElementById("feelsLikeElement");
  feelsLikeElement.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )} °`;
  let iconElement = document.getElementById("icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function clickF(event) {
  let defaultTempElement = document.getElementById("temp");
  let defaultTemp = defaultTempElement.innerHTML;
  let fahrenheitTemp = Math.round(defaultTemp * 1.8 + 32);
  defaultTempElement.innerHTML = fahrenheitTemp;
  fLink.removeEventListener("click", clickF);
  cLink.addEventListener("click", clickC);
}
function clickC(event) {
  let defaultTempElement = document.getElementById("temp");
  let defaultTemp = defaultTempElement.innerHTML;
  let celsiusTemp = Math.round((defaultTemp - 32) / 1.8);
  defaultTempElement.innerHTML = celsiusTemp;
  cLink.removeEventListener("click", clickC);
  fLink.addEventListener("click", clickF);
}

function current() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let currentDate = date.getDate();

  let year = date.getFullYear();

  let currentTime = document.getElementById("current");
  currentTime.innerHTML = `${day}, ${month} ${currentDate}, ${year}`;
}

function formatDay (timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
function displayForecast (response) {
 let forecast = (response.data.daily);


let forecastElement = document.querySelector("#forecast");

let forecastHTML= `<div class="row">`;

forecast.forEach(function(forecastDay, index) {
  if (index < 6) {

  forecastHTML= forecastHTML + `
  <div class="col-2">
   <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
   <img
   src="http://openweathermap.org/img/wn/${
     forecastDay.weather[0].icon
   }@2x.png"
   alt=""
   width="42"
 />  
          <div class = "weather-forecast-temperature">
      <span class = "weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}° |
      </span>
      <span class = "weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
  </div>
</div>`;
  }
})




forecastElement.innerHTML=forecastHTML;
}
