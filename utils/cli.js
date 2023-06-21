const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	tl: {
		type: 'boolean',
		default: false,
		desc: 'Get a quote related to technology',
	},
	ws: {
		type: 'boolean',
		default: false,
		desc: 'Get a quote related to wisdom',
	},
	mv: {
		type: 'boolean',
		default: false,
		desc: 'Get a quote related to motivation',
	},
	sc: {
		type: 'boolean',
		default: false,
		desc: 'Get a quote related to science',
	},
};

const commands = {
	help: { desc: `working...` },
	joke: { desc: `gets a random joke from a free api` },
	quote: { desc: `gets a random quote from an author` }
};

const helpText = meowHelp({
	name: `aman`,
	flags,
	commands
});
// console.log(helpText)

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
