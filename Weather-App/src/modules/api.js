async function fetchWeatherData(reqLocation) {
  const API_KEY = "4DMZLS37YNF6WKL5R2WBNKDVF";
  const reqLocData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      reqLocation
    )}?unitGroup=metric&include=current&key=${API_KEY}&contentType=json`,
    { mode: "cors" }
  );
  const jsondata = await reqLocData.json();
  //   console.log(jsondata);
  return jsondata;
}
// fetchWeatherData("Lahore").then(console.log);

export { fetchWeatherData };
// module.exports = { fetchWeatherData };
