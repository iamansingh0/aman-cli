const axios = require('axios');
const chalk = require('chalk');

const fetchJoke = async () => {
	const { default: boxen } = await import('boxen');
	const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
	// console.log(res)
	const setup = res.data.setup;
	const punchline = res.data.punchline;
	const coloredJoke = `${chalk.green(setup)} \n ${chalk.magenta.bold(punchline)}`;
	const boxedJoke = boxen(coloredJoke, {
		margin: 1,
		float: 'center',
		padding: 1.5,
		borderStyle: 'round',
		borderColor: 'blue',
		backgroundColor: '#EBE7DC',
		title: 'Joke',
		titleAlignment: 'center',
		textAlignment: 'center',
		width: 60
	});
	console.log(boxedJoke);
};

module.exports = {
	fetchJoke: fetchJoke
};
