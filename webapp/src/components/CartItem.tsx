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

type CartItemProps = {
    item: ItemCart;
    updateTotal: () => void;
    deleteItem: (product: Product) => void;
};

  





function CartItem(props: CartItemProps) {
    const [quantity,setQuantity] = useState<number>(props.item.quantity);

    async function changeQuantityBy (item: ItemCart, factor: number): Promise<void> {
        item.quantity += factor;
        setQuantity(item.quantity);
        addToCart(item,factor);
        props.updateTotal();
    };  

    useEffect(() => {
        setQuantity(props.item.quantity);
    }, [props.item.quantity]);

    return (
        <Card variant="elevation" sx={{ display: 'flex', marginBottom:5 }}>
            <CardMedia
                component="img"
                
                //set max image to fill the card
                //sx={{ maxWidth: '100', maxHeight: '110', width: '100', height: '110' }}
                image={props.item.product.image}
                //image={require("path/to/image.jpg")} FOR TESTING
                //set max height to 100px
                sx={{ height: 110, width: 100, margin: 3 }}
                style={{ flex: 2 }} />
            <Box style={{ flex: 3, display: 'flex', flexDirection: 'column' }}
                justifyContent='space-between'>
                <CardContent>
                    <Typography component="h2" variant="h4">
                        { props.item.product.name }
                    </Typography>
                    <Typography component="h3" color="text.secondary">
                        { props.item.product.description }
                    </Typography>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'left', margin: 15 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button size="small" 
                                disabled={props.item.quantity === 1}
                                onClick={() => changeQuantityBy(props.item, -1)}
                                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}>
                                -
                            </Button>
                            <Typography component="h4" align="center">
                                { quantity }
                            </Typography>
                            <Button size="small"
                                onClick={() => changeQuantityBy(props.item, 1)}
                                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}>
                                +
                            </Button>
                        </Stack>
                        <Button 
                            onClick={() => props.deleteItem(props.item.product)}
                            color="error" size="medium" variant="outlined" startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </Stack>
                </div>
            </Box>
            <CardContent style={{ flex: 1, marginRight: 20 }}>
                <Typography component="h1" variant="h4" align="right">
                    { props.item.product.price.toString().concat(" €") }
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CartItem;