import React, { useState, useEffect } from 'react';
import './App.css';
import {BasketItem, Product} from './data';
import ProductCard from "./components/ProductCards";
import ProductDialog from "./components/ProductDialog";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Basket from "./components/Basket";
import BasketDialog from "./components/BasketDialog";
import FilterDialog from "./components/FilterDialog";
import axios from "axios";
import basket from "./components/Basket";


function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [basketItems, setBasket] = useState<BasketItem[]>([]);
    const [shoppingBasketOpen, setShoppingBasketOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ stocked: boolean, search: string}>({ stocked: false, search: "" });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                console.log('Products fetched:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchBasket = async () => {
            try {
                const response = await axios.get('http://localhost:5000/basketitem');
                console.log('Basket items fetched:', response.data);
                setBasket(response.data); // Assuming response.data is an array of BasketItem objects
            } catch (error) {
                console.error('Error fetching basket items:', error);
            }
        };

        fetchProducts();
        fetchBasket();

    }, []);

    useEffect(() => {
        console.log(basketItems)
    }, [basketItems])

    useEffect(() => {
        applyFilters()
    }, [filters])

    const applyFilters = () => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                let filteredProducts = response.data; //This needs to be changed so that the api returns filtered

                if (filters.stocked) {
                    filteredProducts = filteredProducts.filter((a: { stocked: boolean; }) => a.stocked);
                }

                // Apply more filters as needed here
                filteredProducts = filteredProducts.filter((a: { name: string; }) => a.name.toLowerCase().includes(filters.search.toLowerCase()) );
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const closeBasketModal = () => {
        setShoppingBasketOpen(false);
    };
    const closeFilterModal = () => {
        setFilterOpen(false);
    };
    return (
        <div className="App">

            <div className="search-bar">
                <SearchBar
                    products={products}
                    setProduct={setProducts}
                    setFilters={setFilters}
                    applyFilters={applyFilters}
                />
                <Filter
                    setFilter={setFilterOpen}
                />
                <Basket
                    basketItem = {basketItems}
                    setShoppingBasketOpen={setShoppingBasketOpen}
                />
            </div>
            <ProductList products={products} openModal={openModal} />
            <ProductDialog
                product={selectedProduct}
                isOpen={selectedProduct !== null}
                onClose={closeModal}
                setBasket={setBasket}
                basketItems={basketItems}
            />

            <BasketDialog
                basketItems={basketItems}
                isOpen={shoppingBasketOpen}
                onClose={closeBasketModal}
                setBasket={setBasket}
            />

            <FilterDialog
                isOpen={filterOpen}
                onClose={closeFilterModal}
                filters={filters}
                setProducts={setProducts}
                setFilters={setFilters}
                applyFilters={applyFilters}
            />

        </div>
    );
}

interface ProductListProps {
    products: Product[];
}

interface ProductListProps {
    products: Product[];
    openModal: (product: Product) => void;
}

function ProductList({ products, openModal }: ProductListProps) {
    return (
        <div className="products">
            {products.map(product => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onClick={() => openModal(product)}
                />
            ))}
        </div>
    );
}


export default App;
