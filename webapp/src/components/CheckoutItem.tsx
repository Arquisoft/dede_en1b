import React, { useState, useEffect } from 'react';
import { ItemCart, Product } from "../shared/shareddtypes";
import { addToCart, deleteFromCart } from '../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

type CheckoutItemProps = {
    item: ItemCart;    
    updateTotal: () => void;
};

function CheckoutItem(props: CheckoutItemProps) {    

    return (
        <Card variant="elevation" sx={{ display: 'flex', marginBottom:5 }}>
            <CardMedia
                component="img"
                
                image={props.item.product.image}
                sx={{ height: 260, width: 100, margin: 3 }}
                style={{ flex: 2 }} />
            <Box style={{ flex: 3, display: 'flex', flexDirection: 'column' }}
                justifyContent='space-between'>
                <CardContent>
                    <Typography component="h2" variant="h3">
                        { props.item.product.name }
                        
                    </Typography>     
                    <Typography component="h3" variant="h4">
                        
                        <p>x{ props.item.quantity }</p>  
                        <p>Price: { props.item.product.price.toString().concat(" €") }</p>
                    </Typography>               
                </CardContent>
                
            </Box>
            
        </Card>
    );
}

export default CheckoutItem;
