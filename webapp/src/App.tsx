import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import ProductList from './components/ProductList';
import  {getProducts,getCart} from './api/api';
import {Product, ItemCart} from './shared/shareddtypes';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import { addToCart } from './api/api';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);
  const [cart,setCart] = useState<ItemCart[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  }

  const refreshCartList = async () => {
    setCart(await getCart());
  }

  useEffect(()=>{
    refreshProductList();
    refreshCartList();
  },[]);

  return (
    <>
      <Container maxWidth="xl">
        <ShoppingCart items={cart}></ShoppingCart>
        <Link href="https://github.com/arquisoft/dede_en_01b"
        >Source code</Link>
      </Container>
    </>
  );
}

export default App;
