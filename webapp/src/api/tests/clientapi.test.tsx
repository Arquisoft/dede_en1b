import * as api from '../api';
import { ItemCart, Review, User } from '../../shared/shareddtypes';

const myUser: User = {} as User;
const myReview: Review = {} as Review;
const myItem: ItemCart = {
    id: "565656"
} as unknown as ItemCart;
const doNothing = () => {
    // Intentionally empty
}
const emptyCart: ItemCart[] = [] as ItemCart[];

/**
 * Calls to the API methods make the appropriate logs
 * The obtained response is given for non-working backend
 */
test("API logging test", async () => {
    
    api.getUsers().then(
        res => expect(res).toEqual({} as JSON)
    );

    api.getOrders().then( res => 
        expect(res).toEqual({} as JSON)
    );

    api.getProducts().then(
        res => expect(res).toBe(false)
    );

    expect(api.getCart()).toEqual(emptyCart);

    api.getShippingCost();
    api.emptyCart(doNothing);
    
    api.getOrderByUserId("");
    api.getProductById("565656");
    api.getProductImages("");

    api.addReview(myReview);
    api.addToCart(myItem, 1);
    api.addUser(myUser);

    api.adminLogin("user", "password");
    //expect(response).toBe(true);

});