#!/usr/bin/env node

/**
 * aman-cli
 * Use `aman help` command to see the usage
 *
 * @author Aman K <https://aman-kumar-singh.vercel.app/>
 */

require('dotenv').config()
const { fetchWeather } = require('./utils/weather');
const { fetchJoke } = require('./utils/joke')
const { fetchQuote } = require('./utils/quote')
const chalk = require('chalk');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const api = process.env.WEATHER_API

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

 

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	if (input[0] === 'joke') {
		fetchJoke();
	}
	else if (input[0] === 'quote') {
		try {
			let tag = '';
			console.log(flags)
			if (flags.tl) {
				tag = 'technology';
			} else if (flags.ws) {
				tag = 'wisdom';
			} else if (flags.mv) {
				tag = 'motivational';
			} else if (flags.sc) {
				tag = 'science';
			}
			
			if (tag) {
				fetchQuote(tag);
			} else {
				fetchQuote();
				// console.log(res.data[0])
			}
		} catch (error) {
			console.log(error);
		}
	}
	else if(input[0] === 'weather' && input[1]) {
		const city = input[1]
		// console.log(api, city)
		fetchWeather(city, api);
	}
})();
