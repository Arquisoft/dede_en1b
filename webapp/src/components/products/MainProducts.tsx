import { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';

import { getCart, getProducts } from '../../api/api';
import { Product, ItemCart } from '../../shared/shareddtypes';
import ProductCard from './ProductCard';
import Grid from "@mui/material/Grid";

type MainProductsProps = {
  refreshCartList: () => void;
}
function MainProducts(props: MainProductsProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const [products,setProducts] = useState<Product[]>([]);



 

  const refreshProductList = async () => {
    setProducts(await getProducts(searchParams.get('q') as string));
  }

  useEffect(() => {
    refreshProductList();
  }, []);

  return (
    
    <Grid container
      spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
      rowSpacing={5}
    >

      {  products.map((p, i) => (
        <Grid item xs={2} sm={4} md={4} key={p.id} >
          <ProductCard key={p.id} product={p} refreshCartList={props.refreshCartList} />
        </Grid>
      ))}
    </Grid>
  );
};
export default MainProducts;