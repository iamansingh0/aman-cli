#!/usr/bin/env node

/**
 * aman-cli
 * Use `aman help` command to see the usage
 *
 * @author Aman K <https://aman-kumar-singh.vercel.app/>
 */


const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const axios = require('axios');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	if (input[0] === 'joke') {
		const res = await axios.get('https://api.chucknorris.io/jokes/random');
		console.log(res.data.value);
	}
	if(input[0] === 'quote') {
		try {
			const res = await axios.get('https://api.quotable.io/quotes/random?limit=1')
			const data = res.data[0].content;
			const author = res.data[0].authorSlug
			console.log(`${data} ~ by ${author}`)
		} catch(error) {
			console.log(error)
		}
	}
})();
