const { default: axios } = require('axios');

const { getTime } = require('./getTime');
const chalk = require('chalk');
const { getLatLon } = require('./methods/getLatLon');
const { displayTemps } = require('./methods/displayTemp');
const { displayCountry } = require('./methods/dispCountry');
const { displayWeatherDesc } = require('./methods/dispWeatherDesc');

const drawCircle = (temp) => {
	const radius = 10; 
	const symbol = '●'; 
	const space = ' '; 
	const numSymbols = Math.floor((temp + 50) / 10); 
	const numSpaces = Math.floor((100 - temp + 50) / 10); 
	const circle = `${symbol.repeat(numSymbols)}${space.repeat(numSpaces)}`;
	return circle;
};

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
		// console.log(t)
		const print = {
			Country: chalk.red(
				`${displayCountry(weatherData.sys.country)}`
			),
			Sunrise: chalk.magenta(
				`${getTime(weatherData.timezone, weatherData.sys.sunrise)}`
			),
			Sunset: chalk.magenta(
				`${getTime(weatherData.timezone, weatherData.sys.sunset)}`
			),
			CurrentTemp: chalk.bold.blue(`${t.temp} °C`),
			FL: chalk.bold.gray(`${t.feels_like} °C`),
			MinimumTemp: chalk.bold.white(`${t.temp_min} °C`),
			MaximumTemp: chalk.bold.white(`${t.temp_max} °C`),
			Humidity: chalk.bold.magentaBright(`${t.humidity}%`),
			WindSpeed: chalk.bold.magentaBright(`${t.wind}mph`),
			labelMinTemp: chalk.bold.blue('Minimum Temp: '),
			labelMaxTemp: chalk.bold.blue('Maximum Temp: ')
		};

		const boxed = boxen(
			[
				`${chalk.bold.blue("Country: ")} ${print.Country}`,
				``,
				`${chalk.bold.black.bgYellowBright(
					`[ ${displayWeatherDesc(weatherData.weather[0].description)} ]`
				)}`,
				``,
				`${print.CurrentTemp}`,
				``,
				`${chalk.bold.blue("Sunrise: ")} ${print.Sunrise}`,
				`${chalk.bold.blue("Sunset : ")} ${print.Sunset}`,
				``,
				`${chalk.bold.blue("Feels Like: ")} ${print.FL}`,
				``,
				`${chalk.bold.blue("Humidity: ")} ${print.Humidity} | ${chalk.bold.blue("Wind: ")} ${print.WindSpeed}`,
				`${print.labelMinTemp} ${print.MinimumTemp} | ${print.labelMaxTemp} ${print.MaximumTemp}`,
				``
			].join('\n'),
			{
				margin: 1,
				float: 'center',
				padding: 1.5,
				borderStyle: 'round',
				borderColor: 'blue',
				backgroundColor: '#EBE7DC',
				title: 'Weather Report', 
				titleAlignment: 'center',
				textAlignment: 'center'
			}
		);
		console.log(boxed)
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	fetchWeather: fetchWeather
};