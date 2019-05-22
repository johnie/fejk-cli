#!/usr/bin/env node
'use strict';
const fejk = require('./');
const meow = require('meow');
const Table = require('cli-table3');
const clipboardy = require('clipboardy');

(async () => {
	const cli = meow(`
	Usage
	  $ fejk <file> …
	Options
	  --ext  File extension for stdin
	Examples
	  $ fejk unicorn.js:5:3 readme.md:10:2
	  $ echo '<h1>Unicorns!</h1>' | fejk --ext=html
`);

	const fejkData = await fejk();

	if (cli.flags.raw) {
		console.log(fejkData);
	}

	if (cli.flags.table) {
		const table = new Table();
		const tableData = Object.entries(fejkData.data);
		table.push(...tableData);
		console.log(table.toString());
	}

	if (cli.flags.key) {
		const item = fejkData.data[cli.flags.key];
		if (item) {
			console.log(item);
			if (cli.flags.copy) {
				await clipboardy.write(item);
			}
		} else {
			console.log('Could not find key');
		}
	}
})();
