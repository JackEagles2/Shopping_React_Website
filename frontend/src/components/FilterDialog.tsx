import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox} from '@mui/material';
import {Product} from '../data';


interface FilterDialogProps {
    isOpen: boolean;
    onClose: () => void;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setFilters: React.Dispatch<React.SetStateAction<{ stocked: boolean, search: string}>>;
    filters: { stocked: boolean, search: string};
    applyFilters: () => void
}

const FilterDialog: React.FC<FilterDialogProps> = ({ isOpen, onClose, setProducts, setFilters, filters, applyFilters }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked
        }));
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Filters</DialogTitle>
            <DialogContent dividers>
                <Checkbox name="stocked" checked={filters.stocked} onChange={handleChange} /> In Stocked
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterDialog;
