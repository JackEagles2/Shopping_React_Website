const BasketItem = require('../models/BasketItem');
const mongoose = require('mongoose');

// Create a new basket item
const createBasketItem = async (basketItemData) => {
    try {
        const basketItemId = new mongoose.Types.ObjectId();

        // Create a new BasketItem instance with generated _id
        const basketItem = new BasketItem({
            _id: basketItemId,
            product: basketItemData.product, // Assuming product is already an ObjectId referencing a Product
            count: basketItemData.count
            // Add other fields from basketItemData as needed
        });
        await basketItem.save();
        return basketItem;
    } catch (error) {
        console.error('Error creating basket item:', error);
        throw error;
    }
};

// Retrieve all basket items
const getBasketItems = async () => {
    try {
        return await BasketItem.find().populate('product');
    } catch (error) {
        console.error('Error fetching basket items:', error);
        throw error;
    }
};

// Update a basket item by ID
const updateBasketItem = async (basketItemId, updateData) => {
    try {
        return await BasketItem.findByIdAndUpdate(basketItemId, updateData, {new: true});
    } catch (error) {
        console.error('Error updating basket item:', error);
        throw error;
    }
};

// Delete a basket item by ID
const deleteBasketItem = async (basketItemId) => {
    try {
        const basketItem = await BasketItem.findByIdAndDelete(basketItemId);
        console.log("Deleted basket item:", basketItem);
        return basketItem;
    } catch (error) {
        console.error('Error deleting basket item:', error);
        throw error;
    }
};


const increaseItemCount = async (id) => {
    const basketItem = await BasketItem.findById(id);
    if (!basketItem) {
        throw new Error('Basket item not found' + id);
    }
    basketItem.count += 1;
    await basketItem.save();
    return basketItem;
};

const decreaseItemCount = async (id) => {
    const basketItem = await BasketItem.findById(id);
    if (!basketItem) {
        throw new Error('Basket item not found' + id);
    }
    basketItem.count -= 1;
    await basketItem.save();
    return basketItem;
};

module.exports = {
    decreaseItemCount,
    increaseItemCount,
    createBasketItem,
    getBasketItems,
    updateBasketItem,
    deleteBasketItem,
};
