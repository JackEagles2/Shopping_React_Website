const express = require('express');
const router = express.Router();
const basketService = require('../services/basketItemService');

// Handle POST request to create a new product
router.post('/basketitem', async (req, res) => {
    try {
        const productData = req.body; // Assuming JSON body with product data
        const product = await basketService.createBasketItem(productData);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle GET request to fetch all products
router.get('/basketitem', async (req, res) => {
    try {
        const basketItems = await basketService.getBasketItems();
        res.json(basketItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle PUT request to update a product by ID
router.put('/basketitem/:id', async (req, res) => {
    try {
        const basketItemId = req.params.id;
        const updateData = req.body; // Assuming JSON body with updated product data
        const basketItem = await basketService.updateBasketItem(basketItemId, updateData);
        res.json(basketItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle PUT request to increase item count by ID
router.put('/basketitem/increase/:id', async (req, res) => {
    try {
        const basketItemId = req.params.id;
        const basketItem = await basketService.increaseItemCount(basketItemId);
        res.json(basketItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Handle DELETE request to delete a product by ID
router.delete('/basketitem/:id', async (req, res) => {
    try {
        const basketItemId = req.params.id;
        const basketItem = await basketService.deleteBasketItem(basketItemId);
        res.json(basketItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
