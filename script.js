const APIkey = "4df1b28c01626c120d0a88f52b67474d";

// Click listener for your search input
// grab the city they wanrt ch for
// call the first fetch function and pass in the city

const getLatLon = (city) => {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`;
  fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      //GET LAT AND LON
      return getForecast(data.coord.lat, data.coord.lon);
    });
};

const getForecast = (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${APIkey}&units=imperial`;
  fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.querySelector("#weather").style.visibility = "visible"
      document.querySelector("#todays-forecast").textContent =
        data.current.weather[0].description;
      let todayIcon = document.getElementById("today-icon");
      let todayTemperature = document.getElementById("today-temperature");
      let todayHumidity = document.getElementById("today-humidity");
      let todayWindSpeed = document.getElementById("today-wind-speed");
      let todayUV = document.getElementById("today-UV");
      let icon = data.current.weather[0].icon;
      todayIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
      let temp = data.current.temp;
      todayTemperature.innerHTML = "Current Temp: " + Math.round(temp) + "°F";
      let humidity = data.current.humidity;
      let windSpeed = data.current.wind_speed;
      let UV = data.current.uvi;
      todayHumidity.innerHTML = "Humidity: " + humidity + "%";
      todayWindSpeed.innerHTML =
        "Wind Speed: " + Math.round(windSpeed) + " mi/h";
      todayUV.innerHTML = "UV index: " + UV;

      //looping through forecast days

      for (let index = 1; index < 6; index++) {
        let forecastIcon = document.getElementById("forecast-icon-" + index);
        let icon = data.daily[index].weather[0].icon;
        forecastIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
        let forecastDate = document.getElementById("forecast-date-" + index);
        let forecastTemperature = document.getElementById(
          "forecast-temperature-" + index
        );

        let forecastHumidity = document.getElementById(
          "forecast-humidity-" + index
        );
        let forecastWindSpeed = document.getElementById(
          "forecast-wind-speed-" + index
        );
        let date = data.daily[index].dt;
        forecastDate.innerHTML = new Date(date * 1000).toDateString();
        let temp = data.daily[index].temp.max;
        forecastTemperature.innerHTML = "High Temp: " + Math.round(temp) + "°F";
        let humidity = data.daily[index].humidity;
        let windSpeed = data.daily[index].wind_speed;
        forecastHumidity.innerHTML = "Humidity: " + humidity + "%";
        forecastWindSpeed.innerHTML =
          "Wind Speed: " + Math.round(windSpeed) + " mi/h";
        //same as
      }
    });
};
//getLatLon("Raleigh")
document.querySelector("#search-btn").addEventListener("click", function () {
  const searchInput = document.querySelector("#search-input").value;
  console.log(searchInput);
  getLatLon(searchInput);
});

//save latest search history
//showing those buttons and click to show the cities weather
//target id on big card title, todays weather # todays weather line 30
//work with line 34
//loop 5 times the array 0is today done, 12345, tomorrow through next 5 days
