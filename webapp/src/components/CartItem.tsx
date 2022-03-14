import React from "react";
import { ItemCart, Product } from "../shared/shareddtypes";
import { addToCart, deleteFromCart, getProducts } from '../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

type CartItemProps = {
    item: ItemCart;
};

function changeQuantityBy (item: ItemCart, factor: number):void {
    let i = item;
    i.quantity = factor;
    addToCart(i);
};    

function CartItem(props: CartItemProps) {
    
    return (
        <Card variant="elevation" sx={{ display: 'flex', marginBottom:5 }}>
            <CardMedia
                component="img"
                image={props.item.product.image}
                //image={require("path/to/image.jpg")} FOR TESTING
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
                                { props.item.quantity }
                            </Typography>
                            <Button size="small"
                                onClick={() => changeQuantityBy(props.item, 1)}
                                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}>
                                +
                            </Button>
                        </Stack>
                        <Button 
                            onClick={() => deleteFromCart(props.item)}
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