const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const BasketItem = require('./models/BasketItem');
const Product = require('./models/Product'); // Import your model
const productRouter = require('./controllers/productController');
const backetItemRouter = require('./controllers/backetitemController');

const app = express();
const port = process.env.PORT || 5000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/', productRouter);
app.use('/', backetItemRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
