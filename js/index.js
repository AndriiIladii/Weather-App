let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let feelsLike = document.querySelector(".feel");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const card = document.querySelector(".card");
const error = document.querySelector(".error");

const param = {
  url: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
  appid: "71f76cf3eec1f3a4ad11abb6b829a12b",
};

function getWeather(city) {
  fetch(`${param.url}${city}&appid=${param.appid}`)
    .then((response) => {
      if (response.status == 404) {
        error.style.display = "block";
        card.classList.remove("Scale");
        card.style.height = "450px";
        weather.style.display = "none";
      } else {
        return response.json();
      }
    })
    .then(showWeather);
}

function showWeather(data) {
  city.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp) + "&deg;c";
  feelsLike.innerHTML = "Feels like " + Math.round(data.main.temp) + "&deg;c";
  humidity.innerHTML = data.main.humidity + "%";
  wind.innerHTML = data.wind.speed + " km/h";

  switch (data.weather[0].main) {
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
  }

  weather.style.display = "block";
  weather.classList.add("Scale");
  card.style.height = "680px";
  error.style.display = "none";
  console.log(data);
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
