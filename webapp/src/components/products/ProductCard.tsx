
import { Product } from '../../shared/shareddtypes';
import { addToCart, baseApiEndPoint } from '../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, createTheme, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { padding, styled, width } from '@mui/system';

import { useNavigate } from "react-router-dom";
const DivBtonStyle = styled('div')({
  backgroundColor: '#7c4dff',
  color: '#ffff',
  padding: 4,
  borderRadius: 4,
  position: 'relative',
  width: '100%',

});

const theme = createTheme({
  typography:{
    h6:{
      fontSize: '1.5rem',
    },
  },
  palette: {
    secondary: {
      main: '#f23005',
    }}}
    
    )
    ;

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



const ProductCard = (prod: ProductCardProps): JSX.Element => {


  const imgPath = baseApiEndPoint + "/cars/" + prod.product.image + "/" + prod.product.image + " (1).jpg"

  const navigate = useNavigate();

  return (

    <div className="product-card"
      onClick={() => navigate("products/" + prod.product.id)}
    >

      <div className="product-info">

        <div className="product-media"
        ><img src={imgPath} alt={prod.product.name} /></div>
        <div className="product-content">
          <Typography gutterBottom variant="h5" component="div">
            {prod.product.name}
          </Typography>
          <ThemeProvider theme={theme}>
          <Typography variant="h6" color="secondary">
            {prod.product.price}€
          </Typography>
          </ThemeProvider>
        </div>
      </div>
      <div className="product-actions">
        <DivBtonStyle>
          <BuyBtton startIcon={<AddShoppingCartIcon />} onClick={() => {
            addProduct(prod.product)
            prod.refreshCartList();
          }}>

            Add to cart
          </BuyBtton>
        </DivBtonStyle>
      </div>
    </div>

    // the button is contained because it has actions that are primary to our app( add an Item to the cart)


  );
};

export default ProductCard;
