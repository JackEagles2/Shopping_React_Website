const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path as per your project structure
const BasketItem = require('./models/BasketItem'); // Adjust the path as per your project structure

mongoose.connect('mongodb://localhost:27017/mydatabase', {
});
// Define your seed data based on the product schema
const productSeedData = [
    {
        name: 'Smartphone',
        description: 'High-performance smartphone with advanced features.',
        image: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Smartphone',
        stocked: true,
        price: 499.99,
    },
    {
        name: 'Laptop',
        description: 'Sleek and powerful laptop for work and entertainment.',
        image: 'https://placehold.co/600x400/3498DB/FFFFFF?text=Laptop',
        stocked: true,
        price: 1299.99,
    },
    {
        name: 'Smart Watch',
        description: 'Modern smart watch with health monitoring capabilities.',
        image: 'https://placehold.co/600x400/2ECC71/FFFFFF?text=Smart+Watch',
        stocked: true,
        price: 199.99,
    },
    {
        name: 'Headphones',
        description: 'Wireless headphones with noise-cancelling technology.',
        image: 'https://placehold.co/600x400/9B59B6/FFFFFF?text=Headphones',
        stocked: true,
        price: 149.99,
    },
    {
        name: 'Tablet',
        description: 'Portable tablet with a high-resolution display.',
        image: 'https://placehold.co/600x400/E74C3C/FFFFFF?text=Tablet',
        stocked: false,
        price: 349.99,
    },
    {
        name: 'Camera',
        description: 'Professional-grade camera for capturing stunning images.',
        image: 'https://placehold.co/600x400/F39C12/FFFFFF?text=Camera',
        stocked: true,
        price: 899.99,
    },
    {
        name: 'Wireless Speaker',
        description: 'Premium wireless speaker with immersive sound quality.',
        image: 'https://placehold.co/600x400/1ABC9C/FFFFFF?text=Wireless+Speaker',
        stocked: true,
        price: 179.99,
    },
    {
        name: 'Gaming Console',
        description: 'Next-generation gaming console for an ultimate gaming experience.',
        image: 'https://placehold.co/600x400/34495E/FFFFFF?text=Gaming+Console',
        stocked: false,
        price: 399.99,
    },
];


async function seedDatabase() {
    try {
        // Clear existing data (optional)
        await Product.deleteMany();
        await BasketItem.deleteMany();

        // Insert seed data into MongoDB
        const products = await Product.insertMany(productSeedData);
        console.log('Product seed data inserted successfully');

        // Create basket items using the inserted products
        const basketItemSeedData = [
            {
                product: products[0]._id, // Assuming products[0] is the Smartphone
                count: 2
            },
            {
                product: products[1]._id, // Assuming products[1] is the Laptop
                count: 1
            },
            // Add more basket items as needed
        ];

        await BasketItem.insertMany(basketItemSeedData);
        console.log('Basket item seed data inserted successfully');
    } catch (err) {
        console.error('Error seeding database:', err.message);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

// Call the seedDatabase function to run the seeding process
seedDatabase();
