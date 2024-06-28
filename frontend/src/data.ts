export interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    stocked: boolean;
    price: number;
}

export interface BasketItem {
    _id: string
    product: Product;
    count: number;
}
