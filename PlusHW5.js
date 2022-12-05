function loc(event) {
  event.preventDefault();
  let locationName = document.querySelector("#locationName");
  let locationInput = document.querySelector("#locationInput");
  locationName.innerHTML = `${locationInput.value.toUpperCase()}`;

  let apiKey = "8a4f7aeaa0cfd5a41887f2b4b5db391c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let locationSubmit = document.querySelector("#locationSubmit");
locationSubmit.addEventListener("click", loc);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#mainTemp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
  let ampm = hour >= 12 ? `AM` : `PM`;
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute} ${ampm}`;
}

document.querySelector("#time").innerHTML = timeNow(new Date());

function displayFarTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".main-temp-text");
  let farTemp = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farTemp);
}

let celTemp = null;

let farlink = document.querySelector("#far");
farlink.addEventListener("click", displayFarTemp);

function displayCelTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".main-temp-text");
  tempElement.innerHTML = Math.round(celTemp);
}

let cellink = document.querySelector("#cel");
cellink.addEventListener("click", displayCelTemp);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="container-sub-temp">
              <div class="body-sub-day">
                ${forecastDay.dt}
                <br/>
                 <img
                   src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                   alt="clear"
                    id="icon"
                  />
                  <br/>
                  <div class="sub-temp">
                    <span class="sub-temp-min">${forecastDay.temp.min}°</span>
                    <span class="sub-temp-max">${forecastDay.temp.max}°</span>
                  </div>
              </div>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1coea2t66a1bb8c57e354548c0d15a6f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}
