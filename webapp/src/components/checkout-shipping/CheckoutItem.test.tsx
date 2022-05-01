import { fireEvent, render } from "@testing-library/react";
import { ItemCart, Product } from "../../shared/shareddtypes";
import CheckoutItem from "./CheckoutItem";


/**
 * Chek that the CheckoutItem component is working as expected with a product.
 */


    test('checkout item component can be rendered with a product', async () => {
        const fakeProd: Product = {} as Product;
        const cart:ItemCart[] = [{
            product: {
                id: "1",
                name: "Product 1",
                description: "Product 1 description",
                price: 69.99,
                image: "",
                category: "Test",
                reviews: [],
                product: fakeProd,
                _id: "1",
                quantity: 1
            },
            quantity: 1
        }];
        const { getByText } = render(<CheckoutItem item={cart[0]} />);
        expect(getByText("Product 1")).toBeInTheDocument();
        expect(getByText("1 Unit(s)")).toBeInTheDocument();
        expect(getByText("Price: 69.99 €")).toBeInTheDocument();
    })