import { Button, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addReview } from "../../api/api";
import { ProductOrdered } from "../../shared/shareddtypes";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ReviewsView.css';

const theme = createTheme({

    palette: {
      primary: {
        main: '#3f50b5',
        contrastText: '#bd4a4a',
      },
  

}});
type AddReviewCardProps = {
    productOrdered: ProductOrdered;
    userId: string;
    orderId: string;
    setExpanded: (expanded: boolean) => void;
}

//Card with Rating and textField for comment
const AddReviewCard = ( props:AddReviewCardProps): JSX.Element => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);


    function addReviewAction(){
        addReview({userId:props.userId,productId:props.productOrdered.productId,orderId:props.orderId,rating:rating,comment:comment})
        .then(()=>{
            props.productOrdered.reviewed = true;
            props.setExpanded(false);
        });
    }
    
    return (
        <div>
               <div className="review-top">
               <Typography variant="h5" component="h2">
                    Add a review
                </Typography>
                <Rating name="Controlled" 
                value={rating} 
                onChange={(oldValue,newValue)=>{
                    setRating(newValue as number);
                    }}
                    
                />
                </div>
               <div className="review-comment" >
                <TextField
                    fullWidth
                    id="standard-basic"
                    onChange={(e)=>setComment(e.target.value)}
                    label="Comment about the product"
                    variant="outlined"
                    multiline
                    rows={4}
                    
                />
               
               </div>
            <ThemeProvider theme={theme}>
            <Button fullWidth variant="contained" color="primary" onClick={()=>addReviewAction()}>
                    Add review
            </Button>
            </ThemeProvider>
        </div>    
        
    );
}


export default AddReviewCard;


