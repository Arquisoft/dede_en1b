import React from "react";
import { ItemCart, Product } from "../shared/shareddtypes";
import { addToCart, deleteFromCart, getProducts } from './../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import CartItem from "./CartItem";
import { isTemplateSpan } from "typescript";

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

    function loadItems(): JSX.Element {
        if (props.items.length === 0) {    
            return (
                <Typography variant="h5" color="text.secondary">
                    The shopping cart is empty
                </Typography>
            );
        } 
        else {
            //console.log("Length: " + props.items.length)
            let res = props.items.map((item: ItemCart) =>
                {
                    if (item !== null) {
                        return <CartItem item={item}/>
                    }
                }
            )
            return(
                <div>
                    {res}
                </div>
            );
        }
    }

    return (
        <Box justifyContent="center">
            <Typography component="h1" variant="h3" >
                Shopping cart
            </Typography>
            <Divider/>

            <Box style={{ display: 'flex' }}>
                <Stack m={6} spacing={5} style={{ flex: 3 }}>
                    { loadItems() }
                </Stack>
                
                <Stack mt={6} mr={6} style={{flex:1}}>
                    <Card variant="elevation" sx={{display: 'flex', flexDirection: 'column', padding:3 }}>
                        <Typography component="h1" variant="h6" color="text.secondary">
                            Total Amount:
                        </Typography>
                        <Typography component="h1" variant="h4">
                            { props.items.reduce((acc, i) => acc + i.quantity * i.product.price, 0).toString().concat(" €") }
                        </Typography>
                    </Card>
                </Stack>
            </Box>
                
            <div style={{display: 'flex',  justifyContent:'center'}}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Button color="secondary" size="large" href="/">
                        Continue shopping
                    </Button>
                    <Button color="secondary" size="large" variant="outlined" href="/checkout">
                        Checkout
                    </Button>
                </Stack>
            </div>
        </Box>
    );
}

export default ShoppingCart;


