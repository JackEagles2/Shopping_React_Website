const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// Handle POST request to create a new product
router.post('/products', async (req, res) => {
    try {
        const productData = req.body; // Assuming JSON body with product data
        const product = await productService.createProduct(productData);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle GET request to fetch all products
router.get('/products', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle PUT request to update a product by ID
router.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body; // Assuming JSON body with updated product data
        const product = await productService.updateProduct(productId, updateData);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle DELETE request to delete a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.deleteProduct(productId);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
