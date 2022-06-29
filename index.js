function displayTemperature(response) {
  document.getElementById(degreeElement);
  degreeElement.innerHTML = Math.round(response.data.main.temp);
  console.log(degreeElement);
}

let apiKey = "5f091c27ecd3875fabda53b65ecd4358";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sfax&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
