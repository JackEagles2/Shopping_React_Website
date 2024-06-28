import React from 'react';
import { Product } from '../data';

interface SearchBarProps {
    products: Product[];
    setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
    setFilters: React.Dispatch<React.SetStateAction<{ stocked: boolean, search: string}>>;
    applyFilters: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ products, setProduct, setFilters, applyFilters }) => {
    const handleChange = (value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            search: value.toLowerCase(),
        }));
    };

    return (
        <label>
            Search:{''}
            <input onChange={(e) => handleChange(e.target.value)} />
        </label>
    );
};

export default SearchBar;
