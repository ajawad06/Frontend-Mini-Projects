import humidityIcon from "../assets/humidity.svg";
import feelsLikeIcon from "../assets/temp.svg";
import uvIcon from "../assets/uv-index.svg";
import windIcon from "../assets/windspeed.svg";

export function renderWeather(data) {
  const weather_section = document.querySelector(".weather-section");
  weather_section.innerHTML = "";

  //destructure data into variables
  const {
    city,
    temp,
    description,
    condition,
    humidity,
    windspeed,
    feelsLike,
    uvIndex,
    iconURL,
  } = data;

  const cityname = document.createElement("p");
  cityname.id = "city-name";
  cityname.textContent = `${city}`;

  const weather_details = document.createElement("div");
  weather_details.id = "weather-details";

  const icon = document.createElement("img");
  icon.src = iconURL;
  icon.id = "icon";

  const temperature = document.createElement("p");
  temperature.textContent = `${temp}`;
  temperature.id = "temp";

  const conditions = document.createElement("p");
  conditions.textContent = `${condition}`;
  conditions.id = "condition";

  weather_details.appendChild(icon);
  weather_details.appendChild(temperature);
  weather_details.appendChild(conditions);

  const desc = document.createElement("p");
  desc.id = "desc";
  desc.textContent = `${description}`;

  const properties = document.createElement("div");
  properties.classList.add("weather-properties");

  const feelsTempBox = document.createElement("div");
  feelsTempBox.classList.add("box");
  const tempHead = document.createElement("p");
  tempHead.textContent = "Feels Like";
  tempHead.classList.add("boxHead");
  const tempImg = document.createElement("img");
  tempImg.src = feelsLikeIcon;
  tempImg.classList.add("boxImg");
  const tempValue = document.createElement("p");
  tempValue.textContent = `${feelsLike}`;

  feelsTempBox.appendChild(tempHead);
  feelsTempBox.appendChild(tempImg);
  feelsTempBox.appendChild(tempValue);

  const humidityBox = document.createElement("div");
  humidityBox.classList.add("box");
  const humidHead = document.createElement("p");
  humidHead.textContent = "Humidity";
  humidHead.classList.add("boxHead");
  const humidImg = document.createElement("img");
  humidImg.src = humidityIcon;
  humidImg.classList.add("boxImg");
  const humidValue = document.createElement("p");
  humidValue.textContent = `${humidity}`;

  humidityBox.appendChild(humidHead);
  humidityBox.appendChild(humidImg);
  humidityBox.appendChild(humidValue);

  const windspeedBox = document.createElement("div");
  windspeedBox.classList.add("box");
  const windHead = document.createElement("p");
  windHead.textContent = "Wind Speed";
  windHead.classList.add("boxHead");
  const windImg = document.createElement("img");
  windImg.src = windIcon;
  windImg.classList.add("boxImg");
  const windValue = document.createElement("p");
  windValue.textContent = `${windspeed}`;

  windspeedBox.appendChild(windHead);
  windspeedBox.appendChild(windImg);
  windspeedBox.appendChild(windValue);

  const uvBox = document.createElement("div");
  uvBox.classList.add("box");
  const uvHead = document.createElement("p");
  uvHead.textContent = "UV Index";
  uvHead.classList.add("boxHead");
  const uvImg = document.createElement("img");
  uvImg.src = uvIcon;
  uvImg.classList.add("boxImg");
  const uvValue = document.createElement("p");
  uvValue.textContent = `${uvIndex}`;

  uvBox.appendChild(uvHead);
  uvBox.appendChild(uvImg);
  uvBox.appendChild(uvValue);

  properties.appendChild(feelsTempBox);
  properties.appendChild(humidityBox);
  properties.appendChild(windspeedBox);
  properties.appendChild(uvBox);

  weather_section.appendChild(cityname);
  weather_section.appendChild(weather_details);
  weather_section.appendChild(desc);
  weather_section.appendChild(properties);
}
