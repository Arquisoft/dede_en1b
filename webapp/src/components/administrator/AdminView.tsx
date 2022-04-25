import { useState, useEffect } from 'react';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Autocomplete, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { styled } from "@mui/material/styles";

import { Card, Box, Divider} from "@mui/material";
import { addProduct,deleteProduct,getOrders, getProducts } from '../../api/api';
import { Order, Product } from '../../shared/shareddtypes';
import OrderCard from '../user/OrderCard';
import OrdersChart from "./OrdersChart";
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';

function AdminView(): JSX.Element {

    const navigate = useNavigate()
    //if user is not logged in, redirect to login page
    if(!localStorage.getItem("token")){
        navigate("login");
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<FileList>();

    const [selectedProduct, setSelectedProduct] = useState<Product>();

    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    function newProduct() {
        addProduct({name:name, description, price, category} as Product, images as FileList).then((res)=>{
            if(res){
                window.location.reload();
            }
            else
                alert("Error adding product");
        });
    }

    const  fetchOrders= async () => {
        setOrders( await getOrders());
        setProducts(await getProducts());
        console.log(orders);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    function logOut() {
        localStorage.removeItem("token");
        navigate("login");
    }

    function removeProduct(product: Product) {
        deleteProduct(product.id).then((res) => {
            if(res){
                window.location.reload();
            }
            else
                alert("Failed to delete product");
        });
                
    }

    return (
        
        <Box justifyContent="center">
            <Button onClick={() => logOut()}>
            <Logout></Logout>
            </Button>
            <Box justifyContent="center">
            <OrdersChart orders={orders}></OrdersChart>
            </Box>
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

            
                <label> Delete a product:</label>
                <Autocomplete
                    disablePortal
                    id="productComboBox"
                    options={products.map((option) => option.name+" ["+option.id+"]")}
                    renderInput={(params) => <TextField {...params} label="Select Product to delete" variant="outlined" />}
                    contentEditable={false}
                    sx={{width: "600px"}}
                    onChange={(event, value) => {
                        setSelectedProduct(products.filter(product => product.name+" ["+product.id+"]" === value)[0]);
                    }}
                />
                <Button variant="contained" color="primary" onClick={() => removeProduct(selectedProduct as Product)}>
                    Delete Product
                </Button>



                <label >All Orders: </label>
                {orders.map(order => (
                        <OrderCard order={order} />
                    ))}
            </Stack>
        </Box>
        </Box>
    );
}

export default AdminView;