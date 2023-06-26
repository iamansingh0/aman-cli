const { farhToCelsius } = require('./farhToCelsius')

const displayTemps = (data, wind) => {
	const temp = farhToCelsius(data.temp);
	const feels_like = farhToCelsius(data.feels_like);
	const temp_min = farhToCelsius(data.temp_min);
	const temp_max = farhToCelsius(data.temp_max);
	const humidity = data.humidity;
	console.log(
		`Current Temp: ${temp} °C | Feels Like: ${feels_like} °C\nMaximum Temp: ${temp_max} °C | Minimum Temp: ${temp_min} °C`
	);
	console.log(
		`Humidity: ${humidity}%         | Wind Speed: ${wind.speed}mph`
	);
};

module.exports = {
    displayTemps: displayTemps
}