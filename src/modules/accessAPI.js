import { location } from "./domManipulation";

async function getWeatherAPI(location) {
  try {
    // API from https://www.weatherapi.com/api-explorer.aspx#forecast --Free 
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1e62c76943724d31b6834354241201&q=${location}&days=3&aqi=no&alerts=no
    `, { mode: 'cors' });
    let data = await response.json();
    console.log(data);
    if (typeof data.forecast === 'undefined') {
      alert("Please input a valid zip code")
      return null;
    } else {
      return await data;
    }
  } catch {
  }
}

const forecast = (data) => {
  let forecastDaysArray = [];
  let forecastDays = (data.forecast.forecastday);
  forecastDays.forEach(day => {
    forecastDaysArray.push(forecastInfo(day));
  });
  return forecastDaysArray;
}

const forecastInfo = (forecastday) => {
  const day = forecastday.date;
  const minTemp = forecastday.day.mintemp_f;
  const maxTemp = forecastday.day.maxtemp_f;
  const condition = forecastday.day.condition.text;
  const conditionIcon = forecastday.day.condition.icon;
  return { day, minTemp, maxTemp, condition, conditionIcon };
}

const current = (data) => {
  const name = data.location.name;
  const state = data.location.region;
  const temp = data.current.temp_f;
  const windDirection = data.current.wind_dir;
  const wind = data.current.wind_mph;
  return { name, state, temp, windDirection, wind }
}

const hourlyForcast = (data) => {
  let hourlyForcastArray = [];
  let forecastHours = (data.forecast.forecastday[0].hour);
  forecastHours.forEach(hour => {
    hourlyForcastArray.push(hourlyForcastInfo(hour));
  });
  return hourlyForcastArray;
}

const hourlyForcastInfo = (hour) => {
  const time = hour.time;
  const temp = hour.temp_f;
  const conditionIcon = hour.condition.icon;
  return { time, temp, conditionIcon }
}

export {
  getWeatherAPI,
  forecast,
  current,
  hourlyForcast
}