
import { Product } from '../../shared/shareddtypes';
import { addToCart } from '../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { padding, styled, width } from '@mui/system';

import { useNavigate } from "react-router-dom";
const DivBtonStyle = styled('div')({
  backgroundColor: '#7c4dff',
  color: '#ffff',
  padding: 8,
  borderRadius: 4,
  position: 'relative',
  width: '100%',

});

const BuyBtton = styled(Button)({
  size: 'large',
  position: 'relative',
  width: '100%',

});


type ProductCardProps = {
  product: Product;
  refreshCartList: () => void;
}

function addProduct(product: Product): void {
  console.log('addToCart', product);
  addToCart({ product: product, quantity: 1 });
}



const ProductCard = ( prod: ProductCardProps): JSX.Element => {


  const imgPath = "cars/" + prod.product.image + "/" + prod.product.image + " (1).jpg"

  const navigate = useNavigate();

  return (

    <Card 
    >

    <CardActionArea  onClick={()=>navigate("products/"+prod.product.id)}>

        <CardMedia
          component="img"
          image={imgPath}
          alt={prod.product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prod.product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {prod.product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {prod.product.price}€
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <DivBtonStyle>
          <BuyBtton startIcon={<AddShoppingCartIcon />} onClick={() => {
            addProduct(prod.product)
            prod.refreshCartList();
          }}>

            Add to cart
          </BuyBtton>
        </DivBtonStyle>
      </CardActions>
    </Card>

    // the button is contained because it has actions that are primary to our app( add an Item to the cart)


  );
};

export default ProductCard;
