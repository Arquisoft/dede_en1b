import React, { useState, useEffect } from 'react';
import { ItemCart, Product } from "../shared/shareddtypes";
import { addToCart, deleteFromCart, getCart } from '../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import CartItem from "./CartItem";
import { isTemplateSpan } from "typescript";
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

    console.log('ShoppingCart',props);
    const [total, setTotal] = useState<number>(0);  
    
    const  updateTotal = async ()  => {
        console.log('updateTotal');
        let cart = await getCart();
        setTotal(cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    };

    const deleteItem = async (product:Product) => {
        console.log('deleteItem',product);
        await deleteFromCart(product.id);
        updateTotal();
        //set props.items to the new items
        let i = props.items.findIndex(item => item.product.id === product.id);
        if(i>=0){
            delete props.items[i];
            reorganizeProps();
            console.log('deleteItem',props.items);

        }
    };


    function reorganizeProps(): void{
        let temp : ItemCart[] = [];

        //copy all non empty elements
        props.items.forEach(item => {
            if(item != undefined)
                temp.push(item);
        });

        //empty props.items
        props.items.length = 0;

        //copy back to props.items
        temp.forEach(item => {
            props.items.push(item);
        });

    }


    
    useEffect(() => {
        setTotal(props.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    }, [props.items]);





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
                    if (item !== null && item.quantity > 0) {
                        return <CartItem updateTotal={updateTotal} deleteItem={deleteItem} item={item}/>
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
                            { total.toString().concat(" €") }
                        </Typography>
                    </Card>
                    {props.items.length>0?<Button variant="contained" href="/checkout" style = {{color:"white", backgroundColor: "#7c4dff", borderRadius: "8px", top: "20px", height:"50px"}}>
                        Checkout
                    </Button>:<></>}
                </Stack>
            </Box>
                
            <div style={{display: 'flex',  justifyContent:'center'}}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Button color="secondary" size="large" href="/">
                        Continue shopping
                    </Button>
                    

                </Stack>
            </div>
        </Box>
    );
}

export default ShoppingCart;
