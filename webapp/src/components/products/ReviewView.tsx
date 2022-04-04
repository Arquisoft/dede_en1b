import { Rating, Typography } from "@mui/material";
import { Product, Review } from "../../shared/shareddtypes";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
type ReviewViewProps = {
    review: Review;
}

//Shows one review of a product
function ReviewView(props:ReviewViewProps): JSX.Element {
    return (
        <div>
            <div>
                <Typography variant="subtitle1">
                <PersonOutlineIcon> </PersonOutlineIcon> {props.review.userId}
                    </Typography>
            </div>
            <div>
             <ArrowRightIcon /> <Rating name="read-only" value={props.review.rating} readOnly />
            </div>
            <div>
             <Typography variant="body1"> 
              <ArrowRightIcon /> {props.review.comment}
             </Typography>
            </div>
        </div>
    );
}
export default ReviewView;