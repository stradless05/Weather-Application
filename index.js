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
}

let apiKey = "5f091c27ecd3875fabda53b65ecd4358";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sfax&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
