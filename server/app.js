const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Allow requests only from https://linksharing-mern-tailwind.onrender.com/
app.use(cors({
    origin: 'https://linksharing-mern-tailwind.onrender.com/'
}));

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Set up your API routes
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');
app.use('/users', userRoutes);
app.use('/links', linkRoutes);

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});