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
    setCart(await getCart());
  }

  useEffect(()=>{
    refreshProductList();
    refreshCartList();
  },[]);

    return(
        <>
         <Container maxWidth="sm">
        <ProductList products={products}/>
        <Link href="https://github.com/arquisoft/dede_en_01b">Source code</Link>
        {console.log(cart)}
        {cart.map(itemCart => <Box key={itemCart.product.name}>{itemCart.product.name + itemCart.quantity}</Box>)}
        <Link href="/login" >
          Login
      </Link> 
      </Container>

        
        </>
    );
}
export default MainProducts;