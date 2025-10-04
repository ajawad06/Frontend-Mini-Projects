import { fetchWeatherData } from "./api";
// const { fetchWeatherData } = require("./api");

const weatherParser = async function (reqLocation) {
  const data = await fetchWeatherData(reqLocation);
  return {
    city: data.address,
    temp: data.currentConditions.temp,
    description: data.days[0].description,
    condition: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    windspeed: data.currentConditions.windspeed,
    feelsLike: data.currentConditions.feelslike,
    uvIndex: data.currentConditions.uvindex,
    iconURL: getIcon(data.currentConditions.icon),
  };
};
// weatherParser("Lahore").then(console.log);
function getIcon(iconCode) {
  const iconURL =
    "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/3rd%20Set%20-%20Color/";
  return `${iconURL + iconCode}.svg`;
}
export { weatherParser };
// module.exports = { weatherParser };
