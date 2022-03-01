import {Product} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';



type ProductListProps = {
  products: Product[];
}

function ProductList(props: ProductListProps): JSX.Element {
  return (
    <>
      <List>
      {props.products.map((product,i)=>{
        return (
          <ListItem key={product.name}>
            <img src={product.image} alt={product.name}/>
            <ListItemText primary={product.name} secondary={product.price+'€'}/>
          </ListItem>
        )
      })}
      </List>
      
        
          
    </>
  );
}

export default ProductList;
