const { default: axios } = require('axios');
const { getTime } = require('./getTime')

const getLatLon = async (city, api) => {
	// console.log(city, api)
	const res = await axios.get(
		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`
	);
	return res.data[0];
};

const farhToCelsius = (data) => {
	const cels = data - 273.15;
	return cels.toFixed(1);
}

const displayTemps = (data, wind) => {
	const temp = farhToCelsius(data.temp)
	const feels_like = farhToCelsius(data.feels_like)
	const temp_min = farhToCelsius(data.temp_min)
	const temp_max = farhToCelsius(data.temp_max)
	const humidity = data.humidity
	console.log(`Current Temp: ${temp} °C | Feels Like: ${feels_like} °C\nMaximum Temp: ${temp_max} °C | Minimum Temp: ${temp_min} °C`)
	console.log(`Humidity: ${humidity}%         | Wind Speed: ${wind.speed}mph`)
}

const displayCountryCity = (countryCode) => {
	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	console.log(`Country: ${regionNames.of(countryCode)}`);
};

const displayWeatherDesc = desc => {
	var weatherDesc = desc;
	const arr = weatherDesc.split(' ');
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
  const str2 = arr.join(" ");
  console.log(str2)
};

const fetchWeather = async (city, api) => {
	try {
		const data = await getLatLon(city, api);
		const lat = data.lat;
		const lon = data.lon;
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
		);
		const weatherData = res.data;
		console.log(weatherData);
		console.log('______________________________\n');
		displayCountryCity(weatherData.sys.country);
    	displayWeatherDesc(weatherData.weather[0].description)
		var sunTimes = [{
			Sunrise: getTime(weatherData.timezone, weatherData.sys.sunrise),
			Sunset: getTime(weatherData.timezone, weatherData.sys.sunset)
		  }];
		  
		  console.log('  ---------------------');
		  sunTimes.forEach(function(time) {
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