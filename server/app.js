const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Allow requests from both http://localhost:3000 and http://localhost:3001
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
  }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello  World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});