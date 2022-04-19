import { Button, Card, CardActions, CardContent, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addReview } from "../../api/api";
import { ProductOrdered } from "../../shared/shareddtypes";

type AddReviewCardProps = {
    productOrdered: ProductOrdered;
    userId: string;
    orderId: string;
    setExpanded: (expanded: boolean) => void;
}

//Card with Rating and textField for comment
const AddReviewCard = ( props:AddReviewCardProps): JSX.Element => {

    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    function addReviewAction(){
        addReview({userId:props.userId,productId:props.productOrdered.productId,orderId:props.orderId,rating:rating,comment:comment})
        .then(()=>{
            props.setExpanded(false);
            props.productOrdered.reviewed = true;
        });
    }
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Add a review
                </Typography>
                <Rating name="Controlled" 
                value={rating} 
                onChange={(oldValue,newValue)=>{
                    setRating(newValue as number);
                    }}
                
                />
                <TextField
                    id="standard-basic"
                    label="Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={(e)=>setComment(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={()=>addReviewAction()}>
                    Add review
                </Button>
            </CardActions>
        </Card>

    );
}


export default AddReviewCard;


