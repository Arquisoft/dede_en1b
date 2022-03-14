

import React, { useState, useEffect } from 'react';

import  {getCart} from '../../api/api';
import {Product, ItemCart} from '../../shared/shareddtypes';
import ProductCard from './ProductCard';
import  Grid  from "@mui/material/Grid";

type MainProductsProps = {
  products: Product[];
  refreshCartList: () => void;
}
function MainProducts(props:MainProductsProps ):JSX.Element{

  //const [products,setProducts] = useState<Product[]>([]); 
  const [cart,setCart] = useState<ItemCart[]>([]);

//  const refreshProductList = async () => {
//    setProducts(await getProducts());was moved to App 
//  }

  const refreshCartList = async () => {
    setCart( getCart());
  }

  useEffect(()=>{
 //   refreshProductList();
    refreshCartList();
  },[]);

    return(
      <Grid container
     
      spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
      rowSpacing={5}
      
      > 
        {props.products.map((p,i) => (
           <Grid  item xs={2} sm={4} md={4} key={p.id} >
            <ProductCard key={p.id} product={p} refreshCartList={props.refreshCartList} />
          </Grid>
          ))}
      
        
        {console.log(cart)}

        
      </Grid>

        
       
    );
};
export default MainProducts;