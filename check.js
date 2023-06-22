const { default: axios } = require("axios");
// const API = 'ea0c508199f0a5aa52d12f76a599b35e'
require('dotenv').config()

const getLatLon = async (city, api) => {
  const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`);
  return res.data[0];
};

const fetchData = async (city, api) => {
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

const api = process.env.WEATHER_API
fetchData('Lucknow', api);
