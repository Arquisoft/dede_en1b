import { Rating } from "@mui/material";
import { Review } from "../../shared/shareddtypes";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './ReviewsView.css';
type ReviewViewProps = {
    review: Review;
}

//Shows one review of a product
function ReviewView(props: ReviewViewProps): JSX.Element {
    return (
        <div className="review-box">
            <div className="review-top">
                <div className="author">
                    <PersonOutlineIcon> </PersonOutlineIcon> {props.review.userId}
                </div>
                <div className="rating">
                    <Rating name="read-only" value={props.review.rating} readOnly />
                </div>
            </div>

            <div>
                <div className="comment">
                    "{props.review.comment}"
                </div>
            </div>
        </div>
    );
}
export default ReviewView;