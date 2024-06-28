import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import {BasketItem, Product} from '../data';
import axios from "axios";

// Import uuidv4 for generating unique IDs


interface ProductDialogProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
    basketItems: BasketItem[];
}

const ProductDialog: React.FC<ProductDialogProps> = ({ product, isOpen, onClose, setBasket , basketItems}) => {

    const addProductToBasket = async (productToAdd: Product) => {
        if (!basketItems) return;

        // Check if the product is already in the basket
        const existingItemIndex = basketItems.findIndex(item => item.product._id === productToAdd._id);

        if (existingItemIndex !== -1) {
            // If product already exists, update its count in the local state
            const updatedBasket = [...basketItems];
            updatedBasket[existingItemIndex].count++;
            setBasket(updatedBasket);

            // Optionally, update the count on the server as well
            try {
                await axios.put(`http://localhost:5000/basketitem/${updatedBasket[existingItemIndex]._id}`, {
                    count: updatedBasket[existingItemIndex].count
                });
            } catch (error) {
                console.error('Error updating basket item count:', error);
            }
        } else {
            // If product does not exist in basket, add it to the basket
            try {
                const response = await axios.post('http://localhost:5000/basketitem', {
                    product: productToAdd,
                    count: 1  // Initial count when adding to basket
                });
                console.log('Product added to basket:', response.data);
                // Update local state with updated basket items received from backend

                response.data.product = productToAdd;
                const updatedBasketItems = [...basketItems, response.data]; // Add the new item to existing items
                setBasket(updatedBasketItems);
            } catch (error) {
                console.error('Error adding product to basket:', error);
            }
        }
    };

    if (!product) return null
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogContent dividers>
                <Typography className='mini-image-container'>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%' }}/>
                </Typography>
                <Typography gutterBottom>
                    {product.description}
                </Typography>

            </DialogContent>
            <DialogActions>
                {product.stocked ? (
                    <Button onClick={() => addProductToBasket(product)}>
                        Add to Basket
                    </Button>
                ) : (
                    <Typography variant="body2" color="error">
                        Out of Stock
                    </Typography>
                )}

                <Button onClick={onClose} color="primary">
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
