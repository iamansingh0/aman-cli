#!/usr/bin/env node

/**
 * aman-cli
 * Use `aman help` command to see the usage
 *
 * @author Aman K <https://aman-kumar-singh.vercel.app/>
 */

const chalk = require('chalk');
// const boxen = require('boxen');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const axios = require('axios');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	const { default: boxen } = await import('boxen');
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	if (input[0] === 'joke') {
		const res = await axios.get('https://api.chucknorris.io/jokes/random');
		const joke = res.data.value;
		const coloredJoke = chalk.yellow(joke);
		const boxedJoke = boxen(coloredJoke, { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'yellow' });
		console.log(boxedJoke);
	}
	if(input[0] === 'quote') {
		try {
			const res = await axios.get('https://api.quotable.io/quotes/random?limit=1')
			const data = res.data[0].content;
			const author = res.data[0].authorSlug;
			const coloredQuote = chalk.cyan(`${data} ~ by ${author}`);
			const boxedQuote = boxen(coloredQuote, { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'yellow' });
			console.log(boxedQuote);
		} catch(error) {
			console.log(error)
		}
	}
})();
