import "./style.css";
import { weatherParser } from "./modules/weatherDataProcessor";
import { renderWeather } from "./modules/ui";

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = document.querySelector("#inputLoc").value;
  const data = await weatherParser(location);
  renderWeather(data);
});
