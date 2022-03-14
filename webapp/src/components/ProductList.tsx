import { Product } from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { addToCart } from './../api/api';


type ProductListProps = {
  products: Product[];
}

function addProduct(product: Product): void {
  console.log('addToCart', product);
  addToCart({ product: product, quantity: 1 });
}

function ProductList(props: ProductListProps): JSX.Element {
  return (
    <>
      <List>
        {props.products.map((product, i) => {
          return (
            <ListItem key={product.name}>
              <img src={product.image} alt={product.name} />
              <ListItemText primary={product.name} secondary={product.price + '€'} />
              <Button variant="contained" onClick={() => addProduct(product)}>Add to cart</Button>
            </ListItem>
          )
        })}
      </List>



    </>
  );
}

export default ProductList;
