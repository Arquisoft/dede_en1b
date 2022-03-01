import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import ProductList from './components/ProductList';
import  {getProducts} from './api/api';
import {Product, User} from './shared/shareddtypes';
import './App.css';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);

  const refreshUserList = async () => {
    setProducts(await getProducts());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>
      <Container maxWidth="sm">
        <ProductList products={products}/>
        <Link href="https://github.com/arquisoft/dede_en_01b">Source code</Link>
      </Container>
    </>
  );
}

export default App;
