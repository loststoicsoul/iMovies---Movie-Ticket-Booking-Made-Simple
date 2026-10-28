const { spawn } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\x1b[36m%s\x1b[0m', '==================================================');
console.log('\x1b[36m%s\x1b[0m', '  🚀 Starting IMovies (Server + Client)...');
console.log('\x1b[36m%s\x1b[0m', '  Backend:  http://localhost:8000');
console.log('\x1b[36m%s\x1b[0m', '  Frontend: http://localhost:5173');
console.log('\x1b[36m%s\x1b[0m', '==================================================\n');

function runProcess(name, dir, colorCode) {
  const proc = spawn(`${npmCmd} run dev`, {
    cwd: path.resolve(__dirname, dir),
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  const prefix = `\x1b[${colorCode}m[${name}]\x1b[0m `;

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim().length > 0) {
        console.log(`${prefix}${line}`);
      }
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim().length > 0) {
        console.error(`${prefix}\x1b[31m${line}\x1b[0m`);
      }
    });
  });

  proc.on('close', (code) => {
    console.log(`${prefix}Process exited with code ${code}`);
  });

  return proc;
}

const serverProc = runProcess('SERVER', 'server', '34'); // Blue
const clientProc = runProcess('CLIENT', 'client', '32'); // Green

function cleanExit() {
  console.log('\nShutting down IMovies processes...');
  try {
    if (isWindows) {
      if (serverProc.pid) spawn('taskkill', ['/pid', serverProc.pid, '/T', '/F']);
      if (clientProc.pid) spawn('taskkill', ['/pid', clientProc.pid, '/T', '/F']);
    } else {
      serverProc.kill('SIGINT');
      clientProc.kill('SIGINT');
    }
  } catch (e) {
    // ignore
  }
  process.exit();
}

process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);
