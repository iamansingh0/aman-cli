const displayWeatherDesc = desc => {
	var weatherDesc = desc;
	const arr = weatherDesc.split(' ');
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
	const str2 = arr.join(' ');
	console.log(str2);
};

module.exports = {
    displayWeatherDesc: displayWeatherDesc
}