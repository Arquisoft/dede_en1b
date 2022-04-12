import AddressComponent from "../user/address";

import { useState, useEffect } from 'react';
import { getShippingCost, addOrderToUser, getCart, emptyCart } from '../../api/api';
import { Box, Divider, Grid, Button, Link, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    useSession,
    CombinedDataProvider
} from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";
import "../../css/Shipping.css";
import {Session} from "@inrupt/solid-client-authn-browser";
import { getAddressesFromPod, getSession, writeAddressToPod } from "../../api/solid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Address } from "../../shared/shareddtypes";
import {
    handleIncomingRedirect, 
    onSessionRestore
  } from "@inrupt/solid-client-authn-browser";

type ShippingProps = {
    refreshCartList: () => void,
    getSessionInfo: () => Session | undefined,
}
export default function Shipping(props: ShippingProps) {


    const [addresses, setAddresses] = useState<Address[]>([]);
    const [address, setAddress] = useState<Address>();

    useEffect(() => {
        // 2. When loading the component, call `handleIncomingRedirect` to authenticate
        //    the user if appropriate, or to restore a previous session.
        handleIncomingRedirect({
          restorePreviousSession: true
        }).then((info) => {
          console.log(`Logged in with WebID [${info?.webId}]`)
        })
      }, []);
    

    

    useEffect(() => {
        getAddressesFromPod(getSession()?.info.webId as string).then(addresses => {
            setAddresses(addresses);
        });
    }, []);

    const handleChange = (event:any) => {
        setAddress(event.target.value);
      };

    const { session } = useSession();
    const webId = localStorage.getItem('webId') as string;

    const navigate = useNavigate();
    /*  
    var subtotal = getCart().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    // add shipping to this^
    var shippingCost = 3.99
    

    useEffect(() => {
        fetch('/checkout')
          .then(() => addOrder());
    }, []); */

    console.log(getSession())
    getAddressesFromPod(getSession()?.info.webId as string)
    .then(async (addresses) => {
        addresses.forEach(async (address) => {
            console.log(address);
        });
    })

    var shippingCost = getShippingCost(localStorage.getItem("country"), localStorage.getItem("locality"));


    if (localStorage.getItem("webId") === null) {
        return(
            <Typography style={{textAlign: "center"}} variant='h6'>Please, <Link id="li" href="/login">Log In</Link> or register via <Link id="inrupt" href="https://inrupt.com/" target="_blank">Inrupt</Link> or <Link id="solidcom" href="https://solidcommunity.net/" target="_blank">SOLID</Link></Typography>
        );
    }
    
    function addOrder() {
        addOrderToUser(webId).then(() => {
            emptyCart(props.refreshCartList);
            navigate("/");
        });
    }

    let addressBlock;
    if (addresses.length > 0) {
        addressBlock = (
            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Address</InputLabel>
            <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={address}
            onChange={handleChange}
            autoWidth
            label="Address"
            >
                {addresses.map((address) => (
                    <MenuItem value={address as any}>{address.street}</MenuItem>
                ))}

            </Select>
        </FormControl>
        );
    } else {
        //form to add address
        addressBlock = (
            <Box sx={{ m: 1, minWidth: 80 }}>
                <TextField id="street" label="Street" variant="outlined" />
                <TextField id="city" label="City" variant="outlined" />
                <TextField id="state" label="State" variant="outlined" />
                <TextField id="country" label="Country" variant="outlined" />
                <TextField id="zip" label="Zip" variant="outlined" />
                <Button variant="contained" color="primary" onClick={() => {
                    var address = {
                        street: document.getElementById("street")?.innerText,
                        city: document.getElementById("city")?.innerText,
                        state: document.getElementById("state")?.innerText,
                        country: document.getElementById("country")?.innerText,
                        zip: document.getElementById("zip")?.innerText,
                    }
                    writeAddressToPod(getSession()?.info.webId as string, address as Address).then(() => {
                        getAddressesFromPod(getSession()?.info.webId as string).then(addresses => {
                            setAddresses(addresses);
                        });
                    });
                }}>Add Address</Button>
            </Box>
            

        );
    }

    return (
        <Box justifyContent="center">
            <Typography id="shippingTitle" component="h1" variant="h3" >
                Shipping Information
            </Typography>

            {addressBlock}
            
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
                    <Button  onClick={()=>addOrder()}  id="loginButton" data-testid="button" color="primary"  variant="contained">PLACE ORDER</Button>
                </Grid>
            </Grid>
        </Box>
    );
}