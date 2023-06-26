const { default: axios } = require('axios');
const getLatLon = async (city, api) => {
	const res = await axios.get(
		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`
	);
	return res.data[0];
};

module.exports = {
	getLatLon: getLatLon
};