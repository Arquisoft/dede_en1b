import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ShoppingCart} from "@material-ui/icons";
import { Badge, Button, Menu, MenuItem, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';

const SearchBar = () => (
    <Container maxWidth="sm">
        <form style={{width: "50vw"}} action="/" method="get">
            <TextField  
                variant="outlined"
                type="text"
                id="header-search"
                placeholder="Search Items..."
                name="s" 
                style={{width: "40vw", padding: "1%"}}
                sx={{ input: { color: 'white' } }}
            />
            
            <Button type="submit" variant="contained" endIcon={<SearchIcon/>}
            style = {{padding: "1%", marginLeft: "2%", marginTop: "1.5%", backgroundColor: "#F23005", borderRadius: "8px"}}
            >
                Search
            </Button>
        </form>
    </Container>
);

export default function PrimarySearchAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{backgroundColor: "#7c4dff"}}>
   
                    <a style={{ width: "20%", margin: "1%"}} href="/" ><img src="./logo.png" alt="DeDe logo."/></a>

                    <SearchBar/>
                    
                    <Box sx={{ flexGrow: 1 }} />

                    <Box style={{ margin: "1%"}} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="shopping cart" color="inherit" href="/cart">
                            <Badge badgeContent={4} color="secondary">
                                    <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Box>

                    <Box style={{ margin: "1%"}} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                            href="/login"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
