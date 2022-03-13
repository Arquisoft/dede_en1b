import React from "react";
import { ItemCart, Product } from "../shared/shareddtypes";
import { addToCart, deleteFromCart, getProducts } from './../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

type ShoppingCartProps = {
    items: ItemCart[];
};

const Img =
    styled("img")({
        display: "block"
    });

function addProduct(product: Product): void {
    console.log('addToCart',product);
    addToCart({product:product,quantity:1});
}

function ShoppingCart(props: ShoppingCartProps): JSX.Element {
    return (
        <Box justifyContent="center">
            <Typography component="h1" variant="h3" >
                Shopping cart
            </Typography>
            <Divider/>

            <Stack m={6} spacing = {5}>
            {props.items.map((item: ItemCart) =>
                {   
                    if (item.quantity < 0)
                        return;
                    return (
                        <Card variant="outlined" sx={{display: 'flex'}}>
                            <CardMedia
                                component="img"
                                image={item.product.image}
                                //image={require("path/to/image.jpg")} FOR TESTING
                                style={{ flex: 2 }}
                            />
                            <Box style={{ flex: 3, display: 'flex', flexDirection: 'column' }}
                                justifyContent='space-between'>
                                <CardContent>
                                    <Typography component="h1" variant="h4">
                                        { item.product.name }
                                    </Typography>
                                    <Typography component="h1" variant="h6" color="text.secondary" >
                                        { item.product.description }
                                    </Typography>
                                </CardContent>
                                <div style={{display: 'flex',  justifyContent:'right' }}>
                                    <Stack direction="row" spacing={4} alignItems="center">
                                        
                                        <Button color="error" size="medium" 
                                            onClick={ () => deleteFromCart(item) }>
                                            Delete
                                        </Button>
                                    </Stack>
                                </div>
                            </Box>
                            <CardContent style={{ flex: 1 }}>
                                <Typography component="h1" variant="h4" align="right">
                                    { item.product.price.toString().concat(" €") }
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
                
            <div style={{display: 'flex',  justifyContent:'center'}}>
                <Stack direction="row" spacing={3} alignItems="center">
                    
                </Stack>
            </div>
        </Box>
    );
}

export default ShoppingCart;