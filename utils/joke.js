const axios = require('axios');
const chalk = require('chalk');


const fetchJoke = async () => {
    const { default: boxen } = await import('boxen');
	const res = await axios.get('https://api.chucknorris.io/jokes/random');
	const joke = res.data.value;
	const coloredJoke = chalk.yellow(joke);
	const boxedJoke = boxen(coloredJoke, {
		padding: 1,
		margin: 1,
		borderStyle: 'round',
		borderColor: 'yellow'
	});
	console.log(boxedJoke);
};

module.exports = {
	fetchJoke: fetchJoke
};