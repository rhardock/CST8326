const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec); // Required to make await work

const app = require('./server/server'); // import Express app

// Use environment variable PORT or default to 5000
// A different port than the default server is used to avoid conflicts if the server
// is already running separately.
const PORT = process.env.PORT || 3000;


async function run() {
  let server;

  console.log(`Starting server on port ${PORT}...`);

  // Wrap the server start in a Promise so we can await it
  await new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      resolve();
    });
  });

  console.log('Running tests...');

  try {
    console.log('Running npm tests...');

    // run tests via npm test and capture output
    const { stdout } = await execPromise('npm test');

    // console.log(`Test stdout: ${stdout}`);
    processOutput(stdout);

  } catch (err) { // catch both exec errors and test failures
    // console.error(`npm test failed with exit code ${err.code}`);

    if (err.stdout) {
      processOutput(err.stdout);
      // console.log(`Test Output:\n${err.stdout}`);
    }
    if (err.stderr) {
      processOutput(err.stderr);
      // console.error(`Test Errors:\n${err.stderr}`);
    }
  }

  console.log('--- All tests completed ---');

  server.close(() => {
    console.log('Server stopped.');
    process.exit(0); // Clean exit
  });
};

function processOutput(output) {
  const lines = output.split('\n');
  lines.forEach(line => {
    if (line.includes('@')) { // filter for line containing email address
      console.log(line.trim());
    }
  });
}

// Start the process
run();


