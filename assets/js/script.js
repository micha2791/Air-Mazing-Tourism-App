//WHEN user inputs city
//THEN list of flights show up and weather details for that location
const cityNameInput = document.querySelector("#city-name");
const currentConditionsH3 = document.querySelector("#airline-card h3");
const currentConditionsUl = document.querySelector("#airline-card #conditions");
const searchForm = document.querySelector(".button");
const flightlist = document.querySelector("#flight-list");
const cityNameEl = document.querySelector("#city-name");
const currentWeatherIconEl = document.querySelector("#current-weather-icon");
const tempEl = document.querySelector("#temp");
const feelsLikeEl = document.querySelector("#feels-like");
const windSpeedEl = document.querySelector("#wind-speed");

const getFlight = (city) => {
  const apiUrlCoords =
    "http://api.aviationstack.com/v1/flights?access_key=4613b548eb3115bdfa2d64057b8fe768";

  fetch(apiUrlCoords).then(function (response) {
    if (!response.ok) {
      currentConditionsH3.textContent = "Try again!";
    } else {
      response.json().then(function (data) {
        var values = data;

        for (let i = 0; i < values.pagination.count; i++) {
          const newRow = document.createElement("tr");

          // Creating new flightStatus;
          const newFlightStatus = document.createElement("th");
          newFlightStatus.innerHTML = data.data[i].flight_status;
          if (data.data[i].flight_status === "scheduled") {
            newFlightStatus.style.color = "blue";
          } else if (data.data[i].flight_status === "cancelled") {
            newFlightStatus.style.color = "red";
          } else {
            newFlightStatus.style.color = "green";
          }
          newRow.appendChild(newFlightStatus);
          // Creating new flightDate;
          const newFlightDate = document.createElement("th");
          newFlightDate.innerHTML = data.data[i].flight_date;
          newRow.appendChild(newFlightDate);
          // Creating new departureAirport;
          const newDepAirport = document.createElement("th");
          newDepAirport.innerHTML = data.data[i].departure.airport;
          newRow.appendChild(newDepAirport);
          // Creating new arivalAirport;
          const newArivalAirport = document.createElement("th");
          newArivalAirport.innerHTML = data.data[i].arrival.airport;
          newRow.appendChild(newArivalAirport);
          // Creating new airlineName;
          const newAirlineName = document.createElement("th");
          newAirlineName.innerHTML = data.data[i].airline.name;
          newRow.appendChild(newAirlineName);
          // Creating new flightNumber;
          const newFlightNumber = document.createElement("th");
          newFlightNumber.innerHTML = data.data[i].flight.number;
          newRow.appendChild(newFlightNumber);
          // Creating new arivalTime;
          const newArivalTime = document.createElement("th");
          //newArivalTime.innerHTML = data.data[i].arrival.estimated;
          newArivalTime.innerHTML = new Date(
            data.data[i].arrival.estimated
          ).toLocaleString();
          newRow.appendChild(newArivalTime);
          // Creating new departureTime;
          const newDepartureTime = document.createElement("th");
          newDepartureTime.innerHTML = new Date(
            data.data[i].departure.estimated
          ).toLocaleString();
          newRow.appendChild(newDepartureTime);
          // Displaying in UI;
          flightlist.appendChild(newRow);
        }
      });
    }
  });
};

searchForm.addEventListener("click", (event) => {
  event.preventDefault();

  let searchValue = cityNameInput.value.trim("");

  if (searchValue === "") {
    currentConditionsH3.textContent = "Please enter a city!";
  } else {
    currentConditionsH3.textContent = "";
    getFlight(searchValue);
    // call the getWeather function
    getWeather(searchValue);
  }
});

function getWeather(searchValue) {
  const weatherApi = "c9171a22ca52ca8877ccb46ef06fe2f9";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    weatherApi +
    "&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const temperature = data.main.temp;
      console.log("temperature", temperature);
      const feelsLike = data.main.feels_like;
      console.log("feelsLike", feelsLike);
      const windSpeed = data.wind.speed;
      console.log("windspeed", windSpeed);
      const weatherIcon = data.weather[0].icon;
      console.log("weatherIcon", weatherIcon);
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      console.log("weatherIconUrl", weatherIconUrl);

      cityNameEl.textContent = searchValue;
      currentWeatherIconEl.setAttribute("src", weatherIconUrl);
      tempEl.innerHTML = `Temperature: <span>${temperature} C</span>`;
      feelsLikeEl.innerHTML = `Feels Like: <span>${feelsLike}<span>`;
      windSpeedEl.innerHTML = `Wind Speed: <span>${windSpeed} km/h<span>`;
    });
}
