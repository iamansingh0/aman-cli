const displayCountry = countryCode => {
	const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	return regionNames.of(countryCode)
};

module.exports = {
    displayCountry: displayCountry
}