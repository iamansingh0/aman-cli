const axios = require('axios');
const chalk = require('chalk');

const fetchQuote = async (tag = 'wisdom', limit = 1) => {
    const { default: boxen } = await import('boxen');
	try {
		const response = await axios.get(
			`https://api.quotable.io/quotes/random?limit=${limit}&tags=${tag}`
		);
		const data = response.data[0].content;
		const author = response.data[0].author;
		const coloredQuote = chalk.cyan(`${data} ~ by ${author}`);
		const boxedQuote = boxen(coloredQuote, {
			padding: 1,
			margin: 1,
			borderStyle: 'double',
			borderColor: 'yellow'
		});
		console.log(boxedQuote);
	} catch (error) {
		throw new Error(`Failed to fetch quote: ${error.message}`);
	}
};

module.exports = {
	fetchQuote: fetchQuote
};
