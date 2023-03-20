import test from 'ava';
import { execa } from 'execa';

test('main', async (t) => {
  const fejk = await execa('./cli.js', ['--raw']);
  t.true(fejk.stdout.length > 0);
});
