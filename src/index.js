const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

console.log('Current directory:', __dirname);

const app = express();

// Middleware
app.use(bodyParser.json());

// Import all routes
const routes = require('./api/routes/index');
app.use('/api', routes); // Mount all routes under `/api`

// Root route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
