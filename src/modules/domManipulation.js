import {
  locationFormElement,
  locationFormInputElement,
  currentTempElement,
  currentWindElement,
  forecastElement,
  hourlyElement,
  currentDateElement,
  currentLocationElement,
} from './domSelector';
import {
  getWeatherAPI,
  forecast,
  current,
  hourlyForcast,
} from './accessAPI';

let location = '22152';
window.onload = async () => {
    changeData(await getWeatherAPI(location));
}

locationFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  location = locationFormInputElement.value;
  locationFormInputElement.setAttribute('placeholder', `${location}`);
  locationFormInputElement.value = '';
  changeData(await getWeatherAPI(location));
});

const changeData = (data) => {
  let currentForcast = forecast(data);
  let currentWeather = current(data);
  let hourlyWeather = hourlyForcast(data);

  currentTempElement.textContent = `${currentWeather.temp}°F`
  currentWindElement.textContent = `${currentWeather.windDirection}, ${currentWeather.wind} mph`
  currentDateElement.textContent = `${((hourlyWeather[0].time).substring(0, ((hourlyWeather[0].time).length) - 5))}`
  currentLocationElement.textContent = `${currentWeather.name}, ${currentWeather.state}`

  forecastElement.innerHTML = '';
  hourlyElement.innerHTML = '';

  currentForcast.forEach((day) => {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('content-area__lower-right-forecastitem');
    const forecastImg = document.createElement('img');
    forecastImg.src = `${day.conditionIcon}`;
    forecastImg.classList.add('content-area__lower-right-img');
    forecastItem.appendChild(forecastImg);
    const forecastInfo = document.createElement('div');
    forecastInfo.classList.add('content-area__lower-right-infocontainer')
    const date = document.createElement('p');
    date.textContent = `${day.day}`
    const condition = document.createElement('p');
    condition.textContent = `${day.condition}`;
    forecastInfo.appendChild(date);
    forecastInfo.appendChild(condition);
    forecastItem.appendChild(forecastInfo);
    const tempcontainer = document.createElement('div');
    tempcontainer.classList.add('content-area__lower-right-tempcontainer')
    const min = document.createElement('p');
    min.textContent = `${day.minTemp}°F`
    const max = document.createElement('p');
    max.textContent = `${day.maxTemp}°F`;
    tempcontainer.appendChild(min);
    tempcontainer.appendChild(max);
    forecastItem.appendChild(tempcontainer);
    forecastElement.appendChild(forecastItem)
  })

  hourlyWeather.forEach((hour) => {
    const hourlyContainer = document.createElement('div');
    hourlyContainer.classList.add('content-area__column-left-lower-timecontainer');
    const time = document.createElement('p');
    time.textContent = `${((hour.time).substring(((hour.time).length) - 5))}`
    hourlyContainer.appendChild(time);
    const hourlyIcon = document.createElement('img');
    hourlyIcon.src = `${hour.conditionIcon}`;
    hourlyIcon.classList.add('content-area__column-left-lower-timecontainer-img');
    hourlyContainer.appendChild(hourlyIcon);
    const temp = document.createElement('p');
    temp.textContent = `${hour.temp}°F`;
    hourlyContainer.appendChild(temp);
    hourlyElement.appendChild(hourlyContainer);
  })
}

