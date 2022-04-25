import { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';

import { getCart, getProducts } from '../../api/api';
import { Product, ItemCart } from '../../shared/shareddtypes';
import ProductCard from './ProductCard';
import Grid from "@mui/material/Grid";
import '../../css/MainProducts.scss'
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
    
      <div className="products-container">

     
      {  products.map((p, i) => (
     
          <ProductCard key={p.id} product={p} refreshCartList={props.refreshCartList} />
      
      ))}
     </div>
  );
};
export default MainProducts;