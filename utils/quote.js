const axios = require('axios');
const chalk = require('chalk');
const { displayWeatherDesc } = require('./methods/dispWeatherDesc')

const fetchQuote = async (tag = 'wisdom', limit = 1) => {
	// console.log(tag);
	const { default: boxen } = await import('boxen');
	try {
		const response = await axios.get(
			`https://api.quotable.io/quotes/random?limit=${limit}&tags=${tag}`
		);
		const newTag = displayWeatherDesc(tag)
		const data = response.data[0].content;
		const author = response.data[0].author;
		const coloredQuote = chalk.magentaBright(`${data} \n~ by ${author}`);
		const boxedQuote = boxen(coloredQuote, {
			margin: 1,
			float: 'center',
			padding: 1.5,
			borderStyle: 'round',
			borderColor: 'blue',
			backgroundColor: '#EBE7DC',
			title: `${newTag} Quote`,
			titleAlignment: 'center',
			width: 60
		});
		console.log(boxedQuote);
	} catch (error) {
		throw new Error(`Failed to fetch quote: ${error.message}`);
	}
};

module.exports = {
	fetchQuote: fetchQuote
};
