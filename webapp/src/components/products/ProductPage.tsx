import { useEffect, useState } from "react";
import { Product } from '../../shared/shareddtypes';
import { getProductById } from '../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import './ProductPage.css';
import Grid from "@mui/material/Grid";
import { Button, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/system';

import { addToCart } from '../../api/api';
import './image-gallery.scss';
import ImageGallery from 'react-image-gallery';

type ProductPageProps = {
  refreshCartList: () => void;
}

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
const imgsExtension: string[] =[" (1).jpg", 
                                " (2).jpg",
                                " (3).jpg",
                                " (4).jpg",
                                " (5).jpg",
                                " (6).jpg",
                                " (7).jpg",
                                " (8).jpg",
                                " (9).jpg",
                                " (10).jpg",
                              ];
function getImages(product: string, nImgs: number): string{
  let imgs = new Array();
  let imgPath = "/cars/" + product + "/" + product;
  for(let i = 0; i<nImgs; i++){
    imgs.push(new ImgNode(imgPath+ imgsExtension[i], imgPath+ imgsExtension[i]));
  }
  return JSON.stringify(imgs);
}

function addProduct(product: Product): void {
  addToCart({ product: product, quantity: 1 });

}

function ProductPage(prop: ProductPageProps): JSX.Element {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>(); //default empty product
  const getProduct = async () => {
    await setProduct(await getProductById(id));
  };
  useEffect(() => {
    getProduct();
  }, []);


  if (product) {

    let prodImgs = getImages(product?.image, product?.numImages);
    return (
      
      <Grid container

       spacing={2} columns={16}
      >
        <Grid item xs={8}>
        <ImageGallery items={JSON.parse(prodImgs)} />
        </Grid>
        <Grid item xs={8}>
          <Card>

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
            <CardActions>
            <DivBtonStyle>
            <BuyBtton startIcon={<AddShoppingCartIcon />} onClick={() => {
              addProduct(product);
              prop.refreshCartList();
            }} >
              Add to Cart
            </BuyBtton>
          </DivBtonStyle>
          </CardActions>

          </Card>
        </Grid>
       
        
      </Grid>
    

      // the button is contained because it has actions that are primary to our app( add an Item to the cart)


    );
  } else {
    return (<Typography gutterBottom variant="body1" component="div">
      No product found
    </Typography>);
  }
}





class ImgNode {
  original: string;
  thumbnail:string;
  constructor(img:string, cap:string){
    this.original = img;
    this.thumbnail = cap;
  }
  getJSON() : string{
    return JSON.stringify(this);
  }
}





export default ProductPage;
