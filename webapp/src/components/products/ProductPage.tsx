import { useEffect, useState} from "react";
import { Product } from '../../shared/shareddtypes';
import {getProductById} from '../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import './ProductPage.css';
import  Grid  from "@mui/material/Grid";
import {Button, List, Rating} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/system';
import ReviewView from './ReviewView';

import { addToCart } from '../../api/api';

type ProductPageProps = {
  refreshCartList: () => void;
}

const DivBtonStyle = styled('div')({
    backgroundColor: '#7c4dff',
    color: '#ffff',
    padding: 8,
    borderRadius: 4,
    position: 'relative',
    width:'100%',
    
  });
  
  const BuyBtton = styled(Button)({
    size:'large', 
    position: 'relative',
    width:'100%',
  
  });


  function addProduct(product: Product): void {
    addToCart({ product: product, quantity: 1 });

  }

function ProductPage(prop : ProductPageProps) : JSX.Element {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>(); //default empty product
    const getProduct = async () => {
        await setProduct(await getProductById(id));    
    };
    useEffect(()=>{
        getProduct();
    }, []);

    function computeReviewMean(): number {
      if (product) {
        let sum = 0;
        for (const review of product.reviews) {
          sum += review.rating;
        }
        return sum / product.reviews.length;
      }
      return 0;
    }
   
    
  if(product){
    return (
      <Grid container
        direction="row"
        justifyContent="left"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 15 }}
        rowSpacing={5}
        
        > 
          
        <Grid  item xs={2} sm={5} md={6} >
      <Card sx={{ maxWidth: 345 }} style={{height:"100%"}}>
      
          <CardMedia
              component="img"
              image={product?.image}
              alt={product.name}
              
          />
          <CardContent>
              <Typography gutterBottom variant="h3" component="div">
               {product?.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
               {product?.price}€
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
               {product?.description}
              </Typography>
          </CardContent>
      
      
  </Card>
  </Grid>
  <Grid  direction = "column" item xs={2} sm={5} md={6} rowSpacing={100} >
  <Rating name="disabled" value={computeReviewMean()} disabled />
          <DivBtonStyle>
          <BuyBtton startIcon={<AddShoppingCartIcon />} onClick={()=>{addProduct(product);
            prop.refreshCartList();}} >
              Add to Cart
          </BuyBtton> 
          </DivBtonStyle>
          <Card>

            <List>
            {product.reviews.map((review) => (
              <ReviewView review={review} />
            ))}
            </List>
            </Card>
  </Grid>
  
  
  
  </Grid>
  
   
          
    // the button is contained because it has actions that are primary to our app( add an Item to the cart)
          
  
    );
  }else{
    return (<Typography gutterBottom variant="body1" component="div">
    No product found
   </Typography>);
  }
  }
  


export default ProductPage;
