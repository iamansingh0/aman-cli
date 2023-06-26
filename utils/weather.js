const { default: axios } = require('axios');

const { getTime } = require('./getTime');
const chalk = require('chalk');
const { getLatLon } = require('./methods/getLatLon');
const { displayTemps } = require('./methods/displayTemp');
const { displayCountry } = require('./methods/dispCountry');
const { displayWeatherDesc } = require('./methods/dispWeatherDesc');

const fetchWeather = async (city, api) => {
	const { default: boxen } = await import('boxen');
	try {
		const data = await getLatLon(city, api);
		const lat = data.lat;
		const lon = data.lon;
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
		);
		const weatherData = res.data;
		const t = displayTemps(weatherData.main, weatherData.wind);
		const print = {
			Country: chalk.red(
				`${displayCountry(weatherData.sys.country)}`
			),
			Sunrise: chalk.yellow(
				`${getTime(weatherData.timezone, weatherData.sys.sunrise)}`
			),
			Sunset: chalk.yellow(
				`${getTime(weatherData.timezone, weatherData.sys.sunset)}`
			),
			CurrentTemp: chalk.bold.blue(`${t.temp} °C`),
			FeelsLike: chalk.bold.white(`${t.feels_like} °C`),
			MinimumTemp: chalk.bold.white(`${t.temp_min} °C`),
			MaximumTemp: chalk.bold.white(`${t.temp_max} °C`),
			Humidity: chalk.bold.blue(`${t.humidity}%`),
			WindSpeed: chalk.bold.blue(`${t.wind}mph`),
			labelMinTemp: chalk.bold.white('Minimum Temp: '),
			labelMaxTemp: chalk.bold.white('Maximum Temp: ')
		};
		const boxed = boxen(
			[
				`${chalk.bold.blue("Country: ")} ${print.Country}`,
				``,
				`${chalk.bold.white(
					`   [ ${displayWeatherDesc(weatherData.weather[0].description)} ]`
				)}`,
				``,
				`${chalk.bold.blue("Sunrise: ")} ${print.Sunrise}`,
				`${chalk.bold.blue("Sunset : ")} ${print.Sunset}`,
				``,
				`${print.CurrentTemp}`,
				`${print.labelMinTemp} ${print.MinimumTemp}`,
				`${print.labelMaxTemp} ${print.MaximumTemp}`
			].join('\n'),
			{
				margin: 1,
				float: 'center',
				padding: 1.5,
				borderStyle: 'round',
				borderColor: 'red',
				backgroundColor: 'white',
				title: 'Weather Report', 
				titleAlignment: 'center'
			}
		);
		// console.log(print.MinimumTemp)
		console.log(boxed)
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	fetchWeather: fetchWeather
};
