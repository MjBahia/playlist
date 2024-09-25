const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const songsRoutes = require('./routes/router'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', songsRoutes); // Make sure this matches your router

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
