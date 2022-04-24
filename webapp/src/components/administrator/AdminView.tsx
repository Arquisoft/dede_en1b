import { useState, useEffect } from 'react';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button, TextField } from '@mui/material';

import { styled } from "@mui/material/styles";

import { Card, Box, Divider} from "@mui/material";
import { addProduct } from '../../api/api';
import { Product } from '../../shared/shareddtypes';

function AdminView(): JSX.Element {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<FileList>();

    function newProduct() {
        addProduct({name:name, description, price, category} as Product, images as FileList);
    }

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        id="product-description"
                        placeholder="Set Product Description"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        type="number"
                        id="product-price"
                        placeholder="Set Product Price"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                    />

                    <TextField
                        variant="outlined"
                        type="text"
                        id="product-category"
                        placeholder="Set Product category"
                        style={{ width: "50%" }}
                        sx={{ input: { color: 'black' } }}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <Button variant="contained" component="label">
                    Upload File
                    <input type="file" hidden multiple onChange={(event)=>setImages(event.target.files as FileList)}/>
                    </Button>

                    <Button variant="contained" color="primary" onClick={newProduct}>
                        Add Product
                    </Button>            
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