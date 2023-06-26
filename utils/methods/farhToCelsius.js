const farhToCelsius = data => {
	const cels = data - 273.15;
	return cels.toFixed(1);
};

module.exports = {
    farhToCelsius: farhToCelsius
};