import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ShoppingCart } from "@material-ui/icons";
import { Badge, Button, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { ItemCart } from '../../shared/shareddtypes';

import '../../css/NavBar.css';
import { useNavigate, useSearchParams } from 'react-router-dom';


type NavBarProps = {
    cart: ItemCart[];
};



export default function PrimarySearchAppBar(props: NavBarProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    const [search, setSearch] = useState("");

    let q : string = "";
    function handleSearch() {
        window.location.href = "/?q=" + q;
    }

const SearchBar = () => (
    <Container id="searchBarConatiner" style={{maxWidth:'45%'}}>
        <form onSubmit={handleSearch}>
            <TextField
                variant="outlined"
                type="text"
                id="header-search"
                placeholder="Search Items..."
                name="q"
                style={{ width: "100%" }}
                sx={{ input: { color: 'white' } }}
                onChange={(e) => q=e.target.value}

                />

            <Button
                id="submitButton"
                type="submit"
                data-testid="submitButton"
                >
                <SearchIcon />
            </Button>
        </form>
    </Container>
);
    

    const [cartItemNumber, setCartItemNumber] = useState<number>(0);

    useEffect(() => {
        
        setCartItemNumber(props.cart.length);

    }, []);

    return (


        <AppBar position="fixed">
            <Toolbar id="navToolbar">

                <a id="logoLink" href="/" >
                    <img id="logoImg" src="/logo.png" alt="DeDe logo." />
                </a>

                <SearchBar />

                <IconButton
                    data-testid="cart-icon"
                    style={{ marginRight: "2%" }}
                    size="large"
                    aria-label="shopping cart"
                    color="inherit"
                    href="/cart">
                    <Badge
                        badgeContent={props.cart.reduce((acc, i) => acc + i.quantity, 0)}
                        color="secondary"
                    >
                        <ShoppingCart />
                    </Badge>
                </IconButton>

                <IconButton
                    data-testid="account-icon"
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    href="/login"
                    style={{ marginRight: "4%", marginLeft:"1%" }}
                >
                    <AccountCircle />
                </IconButton>

            </Toolbar>
        </AppBar>



    );
}