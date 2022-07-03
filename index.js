let form = document.getElementById("searchForm");
form.addEventListener("submit", submit);
searchCity("Sfax");

enableF();

function submit(event) {
  event.preventDefault();
  let cityInputValue = document.querySelector("#cityInput").value;
  let cityElement = document.querySelector("#cityElement");
  searchCity(cityInputValue);
  cityElement.innerHTML = cityInputValue;
}
function searchCity(city) {
  let apiKey = "5f091c27ecd3875fabda53b65ecd4358";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  console.log(response);
  let degreeElement = document.getElementById("degreeElement");
  degreeElement.innerHTML = Math.round(response.data.main.temp);

  enableF();
  disableC();

  let cityElement = document.getElementById("cityElement");
  cityElement.innerHTML = response.data.name;
  let looksLike = document.getElementById("looksLike");
  looksLike.innerHTML = response.data.weather[0].description;
  let humidityElement = document.getElementById("humidityElement");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind Speed: ${wind} Km/H`;
  let feelElement = document.getElementById("feelsLike");
  feelElement.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}° C`;
  let dateElement = document.getElementById("dateElement");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.getElementById("iconElement");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatDate(timeStamp) {
  let date = new Date(timeStamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dom = date.getDate();
  let year = date.getFullYear();
  return `${day}, ${month} ${dom}, ${year}`;
}

function convertF(event) {
  let tempElement = document.getElementById("degreeElement");
  let temp = tempElement.innerHTML;
  let fTemp = Math.round((temp * 9) / 5 + 32);
  tempElement.innerHTML = fTemp;
  document
    .getElementById("fahrenheit-link")
    .removeEventListener("click", convertF);

  let clink = document.getElementById("celsius-link");
  clink.addEventListener("click", convertC);
}
function convertC(event) {
  let tempElement = document.getElementById("degreeElement");
  let temp = tempElement.innerHTML;
  let cTemp = Math.round((temp - 32) / 1.8);
  tempElement.innerHTML = cTemp;
  enableF();
  disableC();
}

function enableF() {
  let flink = document.getElementById("fahrenheit-link");
  flink.addEventListener("click", convertF);
}
function disableC() {
  document
    .getElementById("celsius-link")
    .removeEventListener("click", convertC);
}

displayForecast();
