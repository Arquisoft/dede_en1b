import AddressComponent from "../user/address";

import { addOrderToUser, emptyCart } from '../../api/api';
import { Box, Divider, Grid, Button, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../../css/Shipping.css";

import { Store } from 'react-notifications-component';

type ShippingProps = {
    refreshCartList: () => void
}
export default function Shipping(props: ShippingProps) {

    const webId = localStorage.getItem('webId') as string;

    const navigate = useNavigate();

    if (localStorage.getItem("webId") === null) {
        return (
            <Typography data-testId="message" style={{ textAlign: "center", marginTop:"40px", display: 'inline-block' }} variant='h6'>Please, <Link id="li" href="/login">Log In</Link> or register via <Link id="inrupt" href="https://inrupt.com/" target="_blank">Inrupt</Link> or <Link id="solidcom" href="https://solidcommunity.net/" target="_blank">SOLID</Link></Typography>
        );
    }

    function addOrder() {
        if ((document.getElementById("combo-box-address") as HTMLInputElement).value.trim().length === 0) {
            Store.addNotification({
                title: "Attention!",
                message: "Please, select an address to continue.",
                type: "warning",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        } else {
            addOrderToUser(webId).then(async () => {
                (document.getElementById("cancelButton") as HTMLButtonElement).disabled = true;
                (document.getElementById("loginButton") as HTMLButtonElement).disabled = true;
                emptyCart(props.refreshCartList);
                Store.addNotification({
                    title: "Yay!",
                    message: "Order succesfully placed.",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
                await new Promise(r => setTimeout(r, 3000));
                navigate("/profile");

            });
        }
    }

    return (
        <Box justifyContent="center">
            <Typography id="shippingTitle" component="h1" variant="h3" style={{display:'inline-block', marginTop:'35px', fontSize:'2.1em', fontWeight:'bold'}} >
                Shipping Information
            </Typography>

            <Divider />

            <AddressComponent />

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button href="/checkout" variant="contained" id="cancelButton" >Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => addOrder()} id="loginButton" data-testid="button" color="primary" variant="contained">PLACE ORDER</Button>
                </Grid>
            </Grid>
        </Box>
    );
}