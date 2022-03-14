import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import ProductList from './components/ProductList';
import Header from './components/NavBar';
import Footer from './components/Footer';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from "./components/about_us"
import MainProducts from './components/products/MainProducts';
import ProductPage from './components/products/ProductPage';
import ShoppingCart from './components/ShoppingCart';
import { addToCart } from './api/api';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);
  const [cart,setCart] = useState<ItemCart[]>([]);


  const refreshUserList = async () => {
    setProducts(await getProducts());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>


      <Header />
        <Container style={{alignContent: "center", marginTop: "5%", minHeight: "50vh"}} maxWidth="lg">
        <Router>
          <Routes>
             <Route path='/' element={<MainProducts products={products}/>} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path='/about_us' element={<AboutUs/>} />
              <Route path='/cart' element={<ShoppingCart items={cart}/>} />
          </Routes>
          </Router>
        </Container>
      <Footer/>

      
    </>
  );
}

export default App;
