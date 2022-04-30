import { useState, useEffect } from 'react';
import { ItemCart } from "../../shared/shareddtypes";
import { getCart, getOrderByUserId } from '../../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import { Card, Box, Divider, Grid } from "@mui/material";

import CheckoutItem from "./CheckoutItem";

type CheckoutProps = {
    items: ItemCart[];
    refreshCartList: () => void;
};

function Checkout(props: CheckoutProps): JSX.Element {

    const [total, setTotal] = useState<number>(0);


    const updateTotal = async () => {
        let cart = getCart();
        setTotal(cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    };

    useEffect(() => {
        setTotal(props.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    }, [props.items]);




    function loadItemsCheckout(): JSX.Element {


        let res = props.items.map((item: ItemCart) => {
            if (item !== null && item.quantity > 0) {
                return <CheckoutItem updateTotal={updateTotal} item={item} />
            }
        }
        )
        return (
            <div>
                {res}
            </div>
        );


    }

    return (
        <Box justifyContent="center">
            <div style={{ display: 'inline-block', marginTop: '30px', fontWeight: 'bold', fontSize: '2.2rem', color: '#7c4dff' }} >
                Checkout
            </div>
            <Divider />

            <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack m={6} spacing={5} style={{
                    margin: "auto", padding: "1%",
                    height: "50vh", width: '80vw', overflow: 'auto',
                    gridColumnStart: 1, gridColumnEnd: 4, backgroundColor: 'white',
                }}>
                    {loadItemsCheckout()}
                </Stack>
                <br></br>
                <Card variant="elevation" sx={{ gridColumnStart: 4, width: '80vw', margin: "auto" }}>
                    <Typography component="h1" variant="h6" color="text.secondary" textAlign="right" marginRight="2%">
                        Cart Totals:
                    </Typography>
                    <Typography component="h1" variant="h4" textAlign="right" marginRight="2%" color="#F23005">
                        {total.toFixed(2).toString().concat(" €")}
                    </Typography>
                </Card>

                <br></br>
                <Grid container style={{width: "80vw", margin: "auto"}}>
                    <Grid item xs={6}>
                        <Button variant="contained" href="/cart" style={{ color: "black", backgroundColor: "lavender", borderRadius: "8px", top: "20px", height: "auto", flex: 2, paddingTop: "3vh", paddingBottom: "3vh", width: "100%"}}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        {props.items.length > 0 ? <Button variant="contained" href="/shipping" style={{ color: "white", backgroundColor: "#7c4dff", borderRadius: "8px", top: "20px", height: "auto", flex: 2, paddingTop: "3vh", paddingBottom: "3vh", width: "100%"}}>
                            Shipping
                        </Button>
                            :
                            <></>}
                    </Grid>

                </Grid>


            </Box>
            <br></br>

        </Box>
    );
}

export default Checkout;