#!/usr/bin/env node
'use strict';
const meow = require('meow');
const jsome = require('jsome');
const Table = require('cli-table3');
const clipboardy = require('clipboardy');
const fejk = require('.');

(async () => {
  const cli = meow(`
	Usage
	  $ fejk …
	Options
		--table:default get fejk data in a table format
		--raw get fejk data in a raw json format
		--key get specific key form fejk data
		  --copy get the key value copied to the cliboard
	Examples
		$ fejk --raw
		$ fejk --key=mail --copy
`);

  const fejkData = await fejk();

  if (Object.keys(cli.flags).length === 0 || cli.flags.table) {
    const table = new Table();
    const tableData = Object.entries(fejkData.data);
    table.push(...tableData);
    console.log(table.toString());
  }

  if (cli.flags.raw) {
    jsome(fejkData);
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
