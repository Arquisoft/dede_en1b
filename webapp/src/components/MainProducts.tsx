import { JsxElement } from "typescript";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './EmailForm';
import Welcome from './Welcome';
import ProductList from './ProductList';
import React, { useState, useEffect } from 'react';

import  {getProducts,getCart} from './../api/api';
import {Product, ItemCart} from './../shared/shareddtypes';

function MainProducts():JSX.Element{

    const [products,setProducts] = useState<Product[]>([]);
  const [cart,setCart] = useState<ItemCart[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  }

  const refreshCartList = async () => {
    setCart( getCart());
  }

  useEffect(()=>{
    refreshProductList();
    refreshCartList();
  },[]);

    return(
        <>
         <Container maxWidth="sm">
        <ProductList products={products}/>
      </Container>

        
        </>
    );
}
export default MainProducts;