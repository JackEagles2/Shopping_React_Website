const Product = require('../models/Product');

// Create a new product
const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Retrieve all products
const getProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Update a product by ID
const updateProduct = async (productId, updateData) => {
    try {
        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        return product;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a product by ID
const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        return product;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
