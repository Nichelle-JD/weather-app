function loc(event) {
  event.preventDefault();
  let locationName = document.querySelector("#locationName");
  let locationInput = document.querySelector("#locationInput");
  locationName.innerHTML = `${locationInput.value.toUpperCase()}`;
  let apiKey = "8a4f7aeaa0cfd5a41887f2b4b5db391c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showHumidity);
  axios.get(apiUrl).then(showWind);
}

let locationSubmit = document.querySelector("#locationSubmit");
locationSubmit.addEventListener("click", loc);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = temperature;
}

// function showCurrentTemperature(response) {
//   let temperature = Math.round(response.data.main.temp);

//   let mainTemp = document.querySelector("#mainTemp");
//   mainTemp.innerHTML = `${temperature}`;
// }

// function showPosition(position) {
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let units = "metric";
//   let apiKey = "8a4f7aeaa0cfd5a41887f2b4b5db391c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

//   axios.get(apiUrl).then(showCurrentTemperature);
// }
// navigator.geolocation.getCurrentPosition(showPosition);

function showHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
}

function showWind(response) {
  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = windSpeed;
}

function dateNow(date) {
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
  let year = date.getFullYear();

  return `${month} ${date.getDate()}, ${year}`;
}

document.querySelector("#date").innerHTML = dateNow(new Date());

function timeNow(date) {
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
  let hour = date.getHours();
  hour = hour - 12;
  let ampm = hour >= 12 ? `PM` : `AM`;
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute} ${ampm}`;
}

document.querySelector("#time").innerHTML = timeNow(new Date());
