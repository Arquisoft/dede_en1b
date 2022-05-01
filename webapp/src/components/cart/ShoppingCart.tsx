import { useState, useEffect } from 'react';
import { ItemCart, Product } from "../../shared/shareddtypes";
import { deleteFromCart, getCart } from '../../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import CartItem from "./CartItem";

type ShoppingCartProps = {
    items: ItemCart[];
    refreshCartList: () => void;
};

const Img =
    styled("img")({
        display: "block"
    });

function ShoppingCart(props: ShoppingCartProps): JSX.Element {

    const [total, setTotal] = useState<number>(0);

    const updateTotal = async () => {
        let cart = await getCart();
        setTotal(cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    };

    const deleteItem = async (product: Product) => {
        await deleteFromCart(product.id);
        updateTotal();
        //set props.items to the new items
        let i = props.items.findIndex(item => item.product.id === product.id);
        if (i >= 0) {
            delete props.items[i];
            reorganizeProps();
        }

        props.refreshCartList();
    };


    function reorganizeProps(): void {
        let temp: ItemCart[] = [];

        //copy all non empty elements
        props.items.forEach(item => {
            if (item != undefined)
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
            let res = props.items.map((item: ItemCart) => {
                if (item !== null && item.quantity > 0) {
                    return <CartItem refreshCartList={props.refreshCartList} updateTotal={updateTotal} deleteItem={deleteItem} item={item} />
                }
            }
            )
            return (
                <div>
                    {res}
                </div>
            );
        }
    }

    return (
        <Box justifyContent="center">
            <div style={{ display: 'inline-block', marginTop: '30px', fontWeight: 'bold', fontSize: '2.2rem', color: '#7c4dff', marginBottom: '1%' }} >
                Shopping cart
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button color="secondary" variant="contained" size="large" href="/"
                    style={{ color: "white", backgroundColor: "#F23005", borderRadius: "8px", top: "20px", height: "50px", padding: "2%" }}>
                    Continue shopping
                </Button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Box style={{}}>


                <Stack m={6} spacing={5} style={{ flex: 3, height: "50vh", margin: "auto", overflow: 'auto', backgroundColor: '#FAF9F6', padding: "1%" }}>
                    {loadItems()}
                </Stack>
                <br></br>
                <Stack mt={6} mr={6} style={{width: "80vw", margin: "auto", flex: 1}}>
                    <Card variant="elevation" sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
                        <Typography component="h1" variant="h6" color="text.secondary">
                            Total Amount:
                        </Typography>
                        <Typography component="h1" variant="h4">
                            {total.toFixed(2).toString().concat(" €")}
                        </Typography>
                    </Card>

                </Stack>
            </Box>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                {props.items.length > 0 ? <Button variant="contained" href="/checkout" size="large"
                    style={{
                        color: "white", backgroundColor: "#7c4dff", borderRadius: "8px",
                        top: "20px", height: "50px", padding: "2%"
                    }}>
                    Checkout
                </Button> : <></>}



            </div>
            <br></br>
        </Box>
    );
}

export default ShoppingCart;
