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
import {Button} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/system';
import { addToCart } from '../../api/api';
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

  

function ProductPage() : JSX.Element {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>(); //default empty product
    const getProduct = async () => {
        await setProduct(await getProductById(id));    
    };
    useEffect(()=>{
        getProduct();
    }, []);
   
 
  
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
            alt={product?.name}
            
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
<Grid  item xs={2} sm={5} md={6} >
        <DivBtonStyle>
        <BuyBtton startIcon={<AddShoppingCartIcon />} >
            Add to Cart
        </BuyBtton> 
        </DivBtonStyle>
</Grid>

</Grid>
 
        
  // the button is contained because it has actions that are primary to our app( add an Item to the cart)
        

  );
}

export default ProductPage;
