const displayCountry = countryCode => {
	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	console.log(`Country: ${regionNames.of(countryCode)}`);
};

module.exports = {
    displayCountry: displayCountry
}