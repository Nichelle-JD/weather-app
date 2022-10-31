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
  axios.get(apiUrl).then(showDescription);
}

let locationSubmit = document.querySelector("#locationSubmit");
locationSubmit.addEventListener("click", loc);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#mainTemp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let ampm = hour >= 12 ? `PM` : `AM`;
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute} ${ampm}`;
}

document.querySelector("#time").innerHTML = timeNow(new Date());
