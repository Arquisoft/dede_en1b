import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ShoppingCart } from "@material-ui/icons";
import { Badge, Button, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { ItemCart } from '../shared/shareddtypes';


type NavBarProps = {
    cart: ItemCart[];
};

const SearchBar = () => (
    <Container style={{ width: "60%", marginLeft: "0" }}>
        <form action="/" method="get" style={{ width: "60%", marginLeft: "20%" }}>
            <TextField
                variant="outlined"
                type="text"
                id="header-search"
                placeholder="Search Items..."
                name="s"
                style={{ width: "100%" }}
                sx={{ input: { color: 'white' } }}
            />

            <Button type="submit" variant="contained"
                style={{
                    marginLeft: "1%", backgroundColor: "#F23005", borderRadius: "8px", width: "2%", top: "7%", height: "86%",
                    position: "absolute"
                }}
            >
                <SearchIcon />
            </Button>
        </form>
    </Container>
);

export default function PrimarySearchAppBar(props: NavBarProps) {
    const [cartItemNumber, setCartItemNumber] = useState<number>(0);

    useEffect(() => {
        setCartItemNumber(props.cart.length);
    }, []);




    return (
        <AppBar position="static">
            <Toolbar style={{ backgroundColor: "#7c4dff" }}>

                <a style={{ width: "10%", marginRight: "5%" }} href="/" ><img style={{ width: "100%" }} src="./logo.png" alt="DeDe logo." /></a>

                <SearchBar />


                <IconButton
                    style={{ marginRight: "1%" }}
                    size="large" aria-label="shopping cart" color="inherit" href="/cart">
                    <Badge badgeContent={props.cart.reduce((acc,i)=>acc+i.quantity,0)} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>

                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    href="/login"
                    style={{ marginRight: "5%" }}
                >
                    <AccountCircle />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
}
