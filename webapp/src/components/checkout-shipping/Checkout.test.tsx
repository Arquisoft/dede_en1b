import { fireEvent, render } from "@testing-library/react";
import { ItemCart, Product } from "../../shared/shareddtypes";
import Checkout from "./Checkout";



/**
 * Test that the checkout component can be rendered without any error using one productOrdered in the cart.
 */

test('checkout component can be rendered', async () => {
    const voidFunc = () => { };
    const fakeProd: Product = {} as Product;
    const cart:ItemCart[] = [{
        product: {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            price: 10,
            image: "",
            category: "Test",
            reviews: [],
            product: fakeProd,
            _id: "1",
            quantity: 2
        },
        quantity: 2
    }];
    const { getByText } = render(<Checkout items={cart} refreshCartList={voidFunc} />);
    expect(getByText("Price: 10 €")).toBeInTheDocument();
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("2 Unit(s)")).toBeInTheDocument();
    expect(getByText("20.00 €")).toBeInTheDocument();

});

/**
 * Test that the checkout component can be rendered without any error using multiple productsOrdered in the cart.
 */

    test('checkout component can be rendered with multiple products', async () => {
        const voidFunc = () => { };
        const fakeProd: Product = {} as Product;
        const cart:ItemCart[] = [{
            product: {
                id: "1",
                name: "Product 1",
                description: "Product 1 description",
                price: 10,
                image: "",
                category: "Test",
                reviews: [],
                product: fakeProd,
                _id: "1",
                quantity: 1
            },
            quantity: 1
        },{
            product: {
                id: "2",
                name: "Product 2",
                description: "Product 2 description",
                price: 20,
                image: "",
                category: "Test",
                reviews: [],
                product: fakeProd,
                _id: "2",
                quantity: 2
            },
            quantity: 2
        }];
        const { getByText } = render(<Checkout items={cart} refreshCartList={voidFunc} />);
        //total price
        expect(getByText("50.00 €")).toBeInTheDocument();
        //product 1
        expect(getByText("Product 1")).toBeInTheDocument();
        expect(getByText("1 Unit(s)")).toBeInTheDocument();
        expect(getByText("Price: 10 €")).toBeInTheDocument();
        //product 2
        expect(getByText("Product 2")).toBeInTheDocument();
        expect(getByText("2 Unit(s)")).toBeInTheDocument();
        expect(getByText("Price: 20 €")).toBeInTheDocument();

    });

