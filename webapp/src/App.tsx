import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import ProductList from './components/ProductList';
import Header from './components/NavBar';
import Footer from './components/Footer';
import  {getProducts,getCart} from './api/api';
import {Product,ItemCart} from './shared/shareddtypes';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from "./components/about_us"
import SOLIDLogin from "./components/SOLIDLogin";
import UserProfile from "./components/UserProfile";
import Shipping from './components/Shipping';

import MainProducts from './components/products/MainProducts';
import ProductPage from './components/products/ProductPage';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import { addToCart } from './api/api';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);
  const [cart,setCart] = useState<ItemCart[]>([]);


  const refreshUserList = async () => {
    setProducts(await getProducts());
  }

  const refreshCartList =  () => {
    setCart( getCart());
  }

  useEffect(()=>{
    refreshUserList();
    refreshCartList();
  },[]);

  return (
    <>


      <Header cart={cart}/>
        <Container style={{alignContent: "center", marginTop: "5%", minHeight: "50vh"}} maxWidth="lg">
        <Router>
          <Routes>
             <Route path='/' element={<MainProducts refreshCartList={refreshCartList}  products={products}/>} />
              <Route path="/products/:id" element={<ProductPage refreshCartList={refreshCartList}/>} />
              <Route path='/about_us' element={<AboutUs/>} />
              <Route path='/login' element={<SOLIDLogin/>} />
              <Route path='/profile' element={<UserProfile/>} />
              <Route path='/shipping' element={<Shipping/>} />
              <Route path='/checkout' element={<Checkout items={cart} refreshCartList={refreshCartList}/>}/>
              <Route path='/cart' element={<ShoppingCart items={cart} refreshCartList={refreshCartList} />} />
          </Routes>
          </Router>
        </Container>
      <Footer/>

      
    </>
  );
}

export default App;
