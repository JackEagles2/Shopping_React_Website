import React, { useState } from 'react';
import { Product } from '../data';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product , onClick}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Card className={`card ${isHovered ? 'hovered' : ''}`}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
              onClick={onClick}
        >
            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                className="card-image"
            />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {product.name} - ${product.price.toFixed(2)}
                </Typography>
                <Typography color="textSecondary">
                    {product.description}
                </Typography>
            </CardContent>

        </Card>
    );
};

export default ProductCard;
