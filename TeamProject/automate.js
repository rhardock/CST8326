const { exec } = require('child_process');
const mongoose = require('mongoose');

const app = require('./server/server'); // import Express app

// Use environment variable PORT or default to 3000
// A different port than the default server is used to avoid conflicts if the server
// is already running separately.
const PORT = process.env.PORT || 3000;

async function run() {
  let server;

  console.log(`Starting server on port ${PORT}...`);

  // Start the server programmatically
  server = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    console.log('Running tests...');

    // Run tests via npm
    exec('npm test', (err, stdout, stderr) => {
      processOutput(stdout);
      if (err) {
        processOutput(stderr);
      }

      // Stop server after tests
      server.close(async () => {
        console.log('Server stopped after tests.');

        try {
          // 1. Close the Database Connection properly
          if (mongoose.connection.readyState !== 0) {
            // This triggers your "Mongoose disconnected" logs
            await mongoose.disconnect();
            console.log('Database connection closed gracefully.');
          }
        } catch (err) {
          console.error('Error during cleanup:', err);
        } finally {
          console.log('--- All resources released ---');
        }
      });
    });
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


