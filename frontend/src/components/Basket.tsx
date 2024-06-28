import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {BasketItem} from "../data";

interface BasketProps {
    basketItem: BasketItem[] | null;
    setShoppingBasketOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Basket: React.FC<BasketProps> = ({ basketItem, setShoppingBasketOpen }) => {
    const basketItemCount = basketItem ? basketItem.reduce((acc, item) => acc + item.count, 0) : 0;


    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            <ShoppingCartIcon onClick={() => setShoppingBasketOpen(true)} />
            <span style={{color: 'red'}}>{basketItemCount}</span>
        </div>
    );
};

export default Basket;
