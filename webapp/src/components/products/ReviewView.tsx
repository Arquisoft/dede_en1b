import { Rating, Typography } from "@mui/material";
import { Product, Review } from "../../shared/shareddtypes";

type ReviewViewProps = {
    review: Review;
}

//Shows one review of a product
function ReviewView(props:ReviewViewProps): JSX.Element {
    return (
        <div>
            <div>
                <Typography variant="subtitle1">{props.review.userId}</Typography>
            </div>
            <div>
                <Rating name="read-only" value={props.review.rating} readOnly />
            </div>
            <div>
                <Typography variant="body1">{props.review.comment}</Typography>
            </div>
        </div>
    );
}
export default ReviewView;