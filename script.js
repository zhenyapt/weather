const API_KEY = "RM5VF7mNfEbR69qUq35Y3Q==Hq0INtduhfD14LDU";

const form = document.querySelector("#form");
const input = document.querySelector(".form__input");

const cloudsImg = {
  clouds0: "img/weather/clouds-0.svg",
  clouds25: "img/weather/clouds-25.svg",
  clouds50: "img/weather/clouds-50.svg",
  clouds75: "img/weather/clouds-75.svg",
  clouds100: "img/weather/clouds-100.svg",
};

//curentCity
document.addEventListener("DOMContentLoaded", getWeatherCurrentCity);

async function getWeatherCurrentCity() {
  const currentCityName = "Voronezh";

  const currentCityInfo = await getGeo(currentCityName);

  const currentWeatherInfo = await getWeather(
    currentCityInfo[0]["latitude"],
    currentCityInfo[0]["longitude"]
  );

  console.log(currentWeatherInfo);

  weatherRender(currentWeatherInfo, currentCityName);
}

// select city
form.addEventListener("submit", submitHandler);

async function submitHandler(e) {
  e.preventDefault();

  if (!input.value.trim()) {
    console.log("Enter City name");
    return;
  }

  const cityName = input.value.trim();

  const cityInfo = await getGeo(cityName);
  console.log("cityInfo", cityInfo);

  if (!cityInfo.length) return;

  console.log(cityInfo[0]["latitude"], cityInfo[0]["longitude"]);

  const weatherInfo = await getWeather(
    cityInfo[0]["latitude"],
    cityInfo[0]["longitude"]
  );

  console.log(weatherInfo);

  weatherRender(weatherInfo, cityName);
}

async function getGeo(cityName) {
  const geoUrl = `https://api.api-ninjas.com/v1/geocoding?city=${cityName}`;
  const response = await fetch(geoUrl, {
    headers: {
      "X-Api-Key": API_KEY,
    },
  });
  console.log(response);
  const data = await response.json();
  return data;
}

async function getWeather(latitude, longitude) {
  const geoUrl = `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`;
  const response = await fetch(geoUrl, {
    headers: {
      "X-Api-Key": API_KEY,
    },
  });
  console.log(response);
  const data = await response.json();
  return data;
}

function weatherRender(weatherInfo, cityName) {
  const weatherImg = document.querySelector(".weather__img");
  console.log(weatherImg.src);

  const name = document.querySelector(".weather__city");
  name.innerHTML = cityName[0].toUpperCase() + cityName.slice(1).toLowerCase();

  const temp = document.querySelector(".weather__temp");
  temp.innerHTML = weatherInfo.temp;

  const humidity = document.querySelector(".details--humidity .details__value");
  humidity.innerHTML = weatherInfo.humidity + " %";

  const wind = document.querySelector(".details--wind .details__value");
  wind.innerHTML = weatherInfo.wind_speed + " km/h";

  const cloudsValue = weatherInfo.cloud_pct;

  if (cloudsValue < 15) weatherImg.src = cloudsImg.clouds0;
  else if (cloudsValue < 25) weatherImg.src = cloudsImg.clouds25;
  else if (cloudsValue < 50) weatherImg.src = cloudsImg.clouds50;
  else if (cloudsValue < 75) weatherImg.src = cloudsImg.clouds75;
  else weatherImg.src = cloudsImg.clouds100;
}
