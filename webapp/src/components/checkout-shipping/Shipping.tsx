
import { getShippingCost } from '../../api/api';



import { Box, Divider, Grid, Button, Link } from "@mui/material";
import Typography from "@mui/material/Typography";

import AddressComponent from "../user/address";

import "../../css/Shipping.css";

export default function Shipping() {
   
    
    var shippingCost = getShippingCost(localStorage.getItem("country"), localStorage.getItem("locality"));

    if (localStorage.getItem("webId") === null) {
        return(
            <Typography style={{textAlign: "center"}} variant='h6'>Please, <Link id="li" href="/login">Log In</Link> or register via <Link id="inrupt" href="https://inrupt.com/" target="_blank">Inrupt</Link> or <Link id="solidcom" href="https://solidcommunity.net/" target="_blank">SOLID</Link></Typography>
        );
    }
    
    return (
        <Box justifyContent="center">
            <Typography id="shippingTitle" component="h1" variant="h3" >
                Shipping Information
            </Typography>

            <Divider />

            <AddressComponent/>

            <Typography id="costMessage" component="h2" variant="h5" >

                Your delivery cost is: <span id="cost">{shippingCost} €</span>

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