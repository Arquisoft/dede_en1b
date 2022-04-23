import { useState, useEffect } from 'react';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button, TextField } from '@mui/material';

import { styled } from "@mui/material/styles";

import { Card, Box, Divider} from "@mui/material";

function AdminView(): JSX.Element {

    return (
        <Box justifyContent="center">
        <Box style={{ display: 'flex' }}>
            <Stack m={6} spacing={5} style={{ flex: 3 }}>
                <label>Add Product:</label>
                <form id="addProductForm">
                    
                    <TextField
                        variant="outlined"
                        type="text"
                        id="product-name"
                        placeholder="Set Product Name"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        id="product-description"
                        placeholder="Set Product Description"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        id="product-price"
                        placeholder="Set Product Price"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        id="product-category"
                        placeholder="Set Product category"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                    />
                    <input type="submit" value = "Add" />
                                   
                </form>

                <label> Delete product:</label>

                <form id="deleteProduct">
                <TextField
                        variant="outlined"
                        type="text"
                        id="product-id"
                        placeholder="Set Product id"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                    />

                <input type="submit" value = "Delete" />
                </form>

                <label >All Orders: </label>
            </Stack>
        </Box>
        </Box>
    );
}

export default AdminView;