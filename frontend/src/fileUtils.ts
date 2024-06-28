import fs from 'fs';
import path from 'path';
import {BasketItem} from "./data"

//This will become the thing that goes to database

const basketFilePath = path.resolve(__dirname, '../data/basket.json');

export const readBasketFromFile = (): BasketItem[] => {
    if (!fs.existsSync(basketFilePath)) {
        return [];
    }
    const data = fs.readFileSync(basketFilePath, 'utf8');
    return JSON.parse(data);
};

export const writeBasketToFile = (basket: BasketItem[]): void => {
    const data = JSON.stringify(basket, null, 2);
    fs.writeFileSync(basketFilePath, data, 'utf8');
};
