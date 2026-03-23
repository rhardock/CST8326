const express = require('express');
const foodModel = require('./food-model');
const app = express();

// Use the environment's port or default to 3000
const PORT = process.env.PORT || 3000;

// Setup JSON middleware to handle incoming requests
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// GET /foods route
app.get('/foods', (req, res) => {
  console.log("GET /foods request received");
    const foods = foodModel.getAll();
    res.status(200).json(foods);
});

// 404 Handling - This must be defined AFTER all other routes,
// as it will catch any requests that don't match the defined routes above.
app.use((req, res) => {
    console.log(`404 Error: Path ${req.originalUrl} not found`);
    res.status(404).send("404 Not Found: The requested resource was not found on this server.");
});


module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
