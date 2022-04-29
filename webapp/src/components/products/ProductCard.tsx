
import { Product } from '../../shared/shareddtypes';
import { addToCart,baseApiEndPoint, getProductImages } from '../../api/api';

import Typography from '@mui/material/Typography';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/system';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
const DivBtonStyle = styled('div')({
  backgroundColor: '#7c4dff',
  color: '#ffff',
  borderRadius: 4,
  padding: 5,
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

  const [imagePath, setImagePath] = useState<string>();
  //const imgPath = baseApiEndPoint+"/cars/" + prod.product.image + "/" + prod.product.image + " (1).jpg"

  const navigate = useNavigate();

  const getImage = async () => {
    setImagePath(baseApiEndPoint+(await getProductImages(prod.product.id)as string[])[0]);
  }; 

  useEffect(() => {
    getImage();
  }, []);

  return (

    <div className="product-card"
      
    >

      <div className="product-info" onClick={() => navigate("products/" + prod.product.id)}>

        <div className="product-media"
        ><img src={imagePath} alt={prod.product.name} /></div>
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
