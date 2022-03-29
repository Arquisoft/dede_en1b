import { getShippingCost } from '../../api/api';


import { Box, Divider, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import "../css/Shipping.css";

export default function Shipping() {
    var shippingCost = getShippingCost();
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