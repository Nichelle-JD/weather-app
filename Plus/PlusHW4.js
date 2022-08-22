function dateNow(date) {
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
  let minute = date.getMinutes();

  return `${day} ${hour}:${minute}`;
}

document.querySelector("#time").innerHTML = dateNow(new Date());

function loc(event) {
  event.preventDefault();
  let locationName = document.querySelector("#locationName");
  let locationInput = document.querySelector("#locationInput");
  locationName.innerHTML = `${locationInput.value}`;
}

let locationSubmit = document.querySelector("#locationSubmit");
locationSubmit.addEventListener("click", loc);

function tempcel() {
  let mainTemp = document.querySelector("#mainTemp");
  let celNo = 17;
  mainTemp.innerHTML = celNo;
}

let cel = document.querySelector("#cel");
cel.addEventListener("click", tempcel);

function tempfar() {
  let mainTemp = document.querySelector("#mainTemp");
  let farNo = 88;
  mainTemp.innerHTML = farNo;
}

let far = document.querySelector("#far");
far.addEventListener("click", tempfar);
