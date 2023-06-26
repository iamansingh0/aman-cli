const { default: axios } = require('axios');
const { getTime } = require('./getTime');
const { getLatLon } = require('../methods/getLatLon')
const { displayTemps } = require('../methods/displayTemp')
const { displayCountry } = require('../methods/dispCountry')
const { displayWeatherDesc } = require('../methods/dispWeatherDesc')

const fetchWeather = async (city, api) => {
	// const { default: boxen } = require('boxen');
	try {
		const data = await getLatLon(city, api);
		const lat = data.lat;
		const lon = data.lon;
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
		);
		const weatherData = res.data;
		// console.log(weatherData);
		console.log('______________________________\n');
		displayCountry(weatherData.sys.country);
		displayWeatherDesc(weatherData.weather[0].description);
		var sunTimes = [
			{
				Sunrise: getTime(weatherData.timezone, weatherData.sys.sunrise),
				Sunset: getTime(weatherData.timezone, weatherData.sys.sunset)
			}
		];

		console.log('  ---------------------');
		sunTimes.forEach(function (time) {
			console.log(`| Sunrise:  ${time.Sunrise} |`);
			console.log(`| Sunset :  ${time.Sunset} |`);
			console.log('  --------------------');
		});

		// console.log("\n")
		displayTemps(weatherData.main, weatherData.wind);
		// console.log("\n
		console.log('______________________________\n');
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	fetchWeather: fetchWeather
};