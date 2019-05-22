import test from 'ava';
import execa from 'execa';
import createTestServer from 'create-test-server';
import fileType from 'file-type';

test('main', async t => {
	const server = await createTestServer();

	server.get('/', (request, response) => {
		response.end('<body>Unicorn</body>');
	});

	const {stdout} = await execa('./cli.js', [server.url], {encoding: 'buffer'});

	t.is(fileType(stdout).mime, 'image/png');

	await server.close();
});

test('check flags', async t => {
	// Copied from `cli.js`
	let flags = `
--width=1000
--height=600
--type=jpeg
	`;

	flags = flags.trim()
		.replace(/(?<==)"|(?<!\\)"$/gm, '')
		.replace(/\\"/g, '"')
		.split('\n');

	const {stdout} = await execa('./cli.js', ['--internal-print-flags', ...flags]);
	const json = JSON.parse(stdout);
	t.snapshot(json);
});