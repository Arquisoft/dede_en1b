import { useState, useEffect } from 'react';
import { getShippingCost, addOrderToUser, getCart } from '../../api/api';
import { Box, Divider, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    useSession,
    CombinedDataProvider
} from "@inrupt/solid-ui-react";

import "../../css/Shipping.css";

export default function Shipping() {

    const { session } = useSession();
    const webId = session.info.webId as string;

    /*  
    var subtotal = getCart().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    // add shipping to this^
    var shippingCost = 3.99
    

    useEffect(() => {
        fetch('/checkout')
          .then(() => addOrder());
    }, []); */

    var shippingCost = getShippingCost();

    addOrderToUser(webId.substring(23, webId.length).slice(0, -16));

    return (
        <Box justifyContent="center">
            <Typography id="shippingTitle" component="h1" variant="h3" >
                Shipping Information
            </Typography>

            <Divider />

            <Typography id="costMessage" component="h2" variant="h5" >

                Your estimated delivery cost is: <span id="cost">{shippingCost} €</span>

            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button href="/checkout" variant="contained" id="cancelButton" >Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button href="/" id="loginButton" data-testid="button" color="primary" variant="contained">PLACE ORDER</Button>
                </Grid>
            </Grid>
        </Box>
    );
}