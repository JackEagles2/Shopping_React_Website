import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import {BasketItem} from '../data';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";

interface BasketDialogProps {
    basketItems: BasketItem[];
    isOpen: boolean;
    onClose: () => void;
    setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}

const BracketDialog: React.FC<BasketDialogProps> = ({ basketItems, isOpen, onClose, setBasket }) => {

    if (!basketItems) return null

    const removeItem = (basketId: string) => {
        const confirmRemove = window.confirm("Are you sure you want to remove this item?");
        if (confirmRemove) {
            setBasket(prevBasket => prevBasket ? prevBasket.filter(b => b.product._id !== basketId) : []);
        }
    };

    const increaseItemCount = async (basketId: string) => {
        console.log('Increasing item count for basketId:', basketId); // Add this line
        try {
            const response = await axios.put(`http://localhost:5000/basketitem/increase/${basketId}`);
            if (response.status === 200) {
                console.log("here")
                setBasket(prevBasket => {
                    if (!prevBasket) return [];
                    return prevBasket.map(b => {
                        if (b.product._id === basketId) {
                            return { ...b, count: b.count + 1 };
                        }
                        return b;
                    });
                });
            }
        } catch (error) {
            console.error("Error increasing item count", error);
        }
    };

    const decreaseItemCount = (basketId: string, count: number) => {
        if (count === 1){
            removeItem(basketId)
        }else {
            setBasket(prevBasket => {
                if (!prevBasket) return [];
                return prevBasket.map(b => {
                    if (b.product._id === basketId && b.count > 1) {
                        return {...b, count: b.count - 1};
                    }
                    return b;
                });
            });
        }
    };

    const totalPrice = () => {
        let totalCount = 0
        basketItems.map((basket) => (
            totalCount += basket.count * basket.product.price
        ));
        return totalCount.toFixed(2);
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Items in Basket</DialogTitle>
            <DialogContent dividers>
                {basketItems.map((basket) => (
                    <div key={basket.product._id} style={{ marginBottom: '10px' }}>
                        <Typography className='mini-image-container'>
                            <img src={basket.product.image} alt={basket.product.name} className="mini-image" />
                        </Typography>
                        <Typography gutterBottom>
                            {basket.product.description}
                        </Typography>
                        <Typography className="inline-items">
                            <RemoveIcon className='icon-hover' onClick={() => decreaseItemCount(basket.product._id, basket.count)} />
                            {basket.count}
                            <AddIcon className='icon-hover' onClick={() => increaseItemCount(basket.product._id)} />
                            ${(basket.product.price * basket.count).toFixed(2)}
                            <Button onClick={() => removeItem(basket.product._id)}>
                                Remove all
                            </Button>
                        </Typography>
                    </div>
                ))}
            </DialogContent>
            <DialogContent dividers>
                Total = ${totalPrice()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BracketDialog;