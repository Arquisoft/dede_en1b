import Container from '@mui/material/Container';
import ProductList from './ProductList';
import { useState, useEffect } from 'react';

import { getProducts, getCart } from './../api/api';
import { Product, ItemCart } from './../shared/shareddtypes';
import { useSearchParams } from 'react-router-dom';

function MainProducts(): JSX.Element {

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<ItemCart[]>([]);
 

  const refreshProductList = async () => {
    setProducts(await getProducts());
  }

  const refreshCartList = async () => {
    setCart(getCart());
  }

  useEffect(() => {
    refreshProductList();
    refreshCartList();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <ProductList products={products} />
      </Container>


    </>
  );
}
export default MainProducts;