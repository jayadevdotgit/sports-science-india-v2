import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const next = require.resolve('next/dist/bin/next');
const env = {...process.env, SSI_LOCAL_PREVIEW: '1'};

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [next, ...args], {env, stdio: 'inherit'});
    child.once('error', reject);
    child.once('exit', (code) => resolve(code ?? 1));
  });
}

const built = await run(['build']);
if (built !== 0) process.exit(built);
console.log('Staff preview: http://localhost:3001/staff/login');
process.exitCode = await run(['start', '--hostname', '127.0.0.1', '--port', '3001']);
