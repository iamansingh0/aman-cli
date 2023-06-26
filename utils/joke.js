const axios = require('axios');
const chalk = require('chalk');

const fetchJoke = async () => {
	const { default: boxen } = await import('boxen');
	const res = await axios.get('https://api.chucknorris.io/jokes/random');
	const joke = res.data.value;
	const coloredJoke = chalk.green(joke);
	const boxedJoke = boxen(coloredJoke, {
		margin: 1,
		float: 'center',
		padding: 1.5,
		borderStyle: 'round',
		borderColor: 'blue',
		backgroundColor: '#EBE7DC',
		title: 'Joke',
		titleAlignment: 'center',
		textAlignment: 'center'
	});
	console.log(boxedJoke);
};

module.exports = {
	fetchJoke: fetchJoke
};
