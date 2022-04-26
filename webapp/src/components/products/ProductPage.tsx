import { useEffect, useState } from "react";
import { Product } from '../../shared/shareddtypes';
import { getProductById, getProductImages, addToCart, baseApiEndPoint } from '../../api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import './ProductPage.css';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Button, CardActions, List, Rating } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/system';
import ReviewView from './ReviewView';

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

async function getImages(product: Product): Promise<string> {
  console.log('getImages', product);
  let imgs = new Array();
  let imagePaths = await getProductImages(product.id);
  for (let i = 0; i < imagePaths.length; i++) {
    imgs.push(new ImgNode(baseApiEndPoint + imagePaths[i], baseApiEndPoint + imagePaths[i]));
  }
  return JSON.stringify(imgs);
}

function addProduct(product: Product): void {
  addToCart({ product: product, quantity: 1 });

}

function ProductPage(prop: ProductPageProps): JSX.Element {
  const { id } = useParams();
  const [productFound, setProductFound] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(); //default empty product
  const [images, setImages] = useState<string>();

  const getProduct = async () => {
    getProductById(id).then(
      async p => {
        if (p) {
          setImages(await getImages(p));
          setProduct(p);
        }
        setProductFound(true);
      });
  };



  useEffect(() => {
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

  // the product was found correctly
  if (productFound && product) {

    return (
      <div>
        <div className="product-page-container">



          <ImageGallery items={JSON.parse(images as string)} />


          <Card>

            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {product?.name}
              </Typography>
              <Rating name="disabled" value={computeReviewMean()} disabled />
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
                  addProduct(product as Product);
                  prop.refreshCartList();
                }} >
                  Add to Cart
                </BuyBtton>

              </DivBtonStyle>
            </CardActions>

          </Card>
        </div>
        <Card>
          <Typography gutterBottom variant="h5" component="div">
            Reviews of the product          <ReviewsIcon> </ReviewsIcon>
          </Typography>
          <List>
            {product.reviews.map((review) => (
              <ReviewView review={review} />
            ))}
          </List>
        </Card>



      </div>









      // the button is contained because it has actions that are primary to our app( add an Item to the cart)



    );
    //the product was not found
  } else if (productFound && !product) {
    return (<Typography gutterBottom variant="body1" component="div">
      No product found
    </Typography>);
  }
  //the product is still loading
  else {
    return (<Typography gutterBottom variant="body1" component="div"></Typography>);
  }
}





class ImgNode {
  original: string;
  thumbnail: string;
  constructor(img: string, cap: string) {
    this.original = img;
    this.thumbnail = cap;
  }
  getJSON(): string {
    return JSON.stringify(this);
  }
}





export default ProductPage;
