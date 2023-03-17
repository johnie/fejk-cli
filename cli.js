#!/usr/bin/env node
import meow from 'meow';
import jsome from 'jsome';
import Table from 'cli-table3';
import clipboardy from 'clipboardy';
import fejk from './index.js';

const cliProgram = async () => {
  const cli = meow(
    `
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
`,
    {
      importMeta: import.meta,
      flags: {
        table: {
          type: 'boolean',
        },
        raw: {
          type: 'boolean',
        },
        key: {
          type: 'string',
        },
        copy: {
          type: 'boolean',
        },
      },
    }
  );

  const fejkData = await fejk();

  if (Object.values(cli.flags).every((flag) => !flag)) {
    cli.showHelp();
  }

  if (cli.flags.table) {
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
    if (!item) {
      console.log(`No key named ${cli.flags.key} found`);
    }

    console.log(item);

    if (cli.flags.copy) {
      await clipboardy.write(item);
    }
  }
};

cliProgram();
