function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  document.getElementById(degreeElement);
  degreeElement.innerHTML = Math.round(response.data.main.temp);
  document.getElementById(cityElement);
  cityElement.innerHTML = response.data.name;
  document.getElementById(looksLike);
  looksLike.innerHTML = response.data.weather[0].description;
  document.getElementById(humidityElement);
  let humidity = response.data.main.humidity;
  console.log(humidity);
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  console.log(wind);
  windElement.innerHTML = `Wind: ${wind} Km/H`;
  document.getElementById(dateElement);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "5f091c27ecd3875fabda53b65ecd4358";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sfax&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
