const { exec } = require('child_process');
const mongoose = require('mongoose');

const app = require('./server/server'); // import Express app

async function run() {
  let server;

  console.log(`Starting server...`);

  // Start the server programmatically -- Port 0 means OS dynamically assigns an available port
  // this helps guarantee that our tests can run separately from the server instance, if running
  server = app.listen(0, () => {
    // CAPTURE the port assigned by the OS
    const assignedPort = server.address().port;
    console.log(`Server running on port ${assignedPort}`);

    console.log('Running tests...');

    // Run tests via npm
    exec('npm test', {
      env: {
        ...process.env,
        PORT: assignedPort
      }
    }, (err, stdout, stderr) => {
      processOutput(stdout);
      if (err) {
        processOutput(stderr);
      }

      // Stop server after tests
      server.close(async () => {
        console.log('Server stopped after tests.');

        try {
          if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('Database connection closed gracefully.');
          }
        } catch (err) {
          console.error('Error during cleanup:', err);
        } finally {
          console.log('--- All resources released ---');
        }
      });
    }); // End of exec
  }); // End of server.listen
} // End of run function

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


