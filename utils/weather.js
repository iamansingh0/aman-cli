const { default: axios } = require("axios");

const getLatLon = async (city, api) => {
  console.log(city, api)
  const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`);
  return res.data[0];
};

const fetchWeather = async (city, api) => {
  try {
    const data = await getLatLon(city, api);
    console.log(`\nLat coord: ${data.lat} \nLon cooord: ${data.lon}\n`);
    const lat = data.lat
    const lon = data.lon
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`)
    console.log(res)
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
	fetchWeather: fetchWeather
};