import { render, screen } from '@testing-library/react';
import { Review } from '../../shared/shareddtypes';
import ReviewView from './ReviewView';
const reviewTest: Review = {
    userId: "dummy",
    productId: "prod1",
    rating: 5,
    comment: "testing1",
    orderId: "order1"
}
test("Review view is rendered properly", async () => {

    render(<ReviewView review={reviewTest}></ReviewView>);
    expect(screen.getByText('dummy')).toBeInTheDocument();
    expect(screen.getByText('"testing1"')).toBeInTheDocument();


});