const { default: axios } = require('axios');

const getLatLon = async (city, api) => {
	// console.log(city, api)
	const res = await axios.get(
		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`
	);
	return res.data[0];
};

const displayCountryCity = (city, countryCode) => {
	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	console.log(`Country: ${regionNames.of(countryCode)}\nCity: ${city}`);
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
		// console.log(`\nLat coord: ${data.lat} \nLon cooord: ${data.lon}\n`);
		const lat = data.lat;
		const lon = data.lon;
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
		);
		const weatherData = res.data;
		// console.log(weatherData);
		console.log('______________________________');
		displayCountryCity(weatherData.name, weatherData.sys.country);
    displayWeatherDesc(weatherData.weather[0].description)
		// const tempData =
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	fetchWeather: fetchWeather
};
