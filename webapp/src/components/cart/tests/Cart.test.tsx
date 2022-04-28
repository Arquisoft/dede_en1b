import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ShoppingCart from "../ShoppingCart";
import { ItemCart, Product } from "../../../shared/shareddtypes";
import { act } from "react-dom/test-utils";

/**
 * Test that the shopping cart is rendered correctly
 * when empty
 */
test("Cart empty is rendered correctly", async() => {
    const itemCarts: ItemCart[] = [];
    const doNothing = () => {};

    const { getByText } = render (
        <Router>
            <ShoppingCart
                items = { itemCarts }
                refreshCartList = {doNothing}
            />
        </Router>
    )

    // The expected messages
    expect(getByText("Shopping cart")).toBeInTheDocument();
    expect(getByText("The shopping cart is empty")).toBeInTheDocument();
    // The total ammount must be 0
    expect(getByText("0.00 €")).toBeInTheDocument();
});

/**
 * Test that the shopping cart is rendered correctly
 * when containing several products
 */
 test("Cart with products is rendered correctly", async() => {
     
    const fakeProd: Product = {} as Product;
    const itemCarts: ItemCart[] = [
        {
            product: {
                id: "1234",
                name: "P1",
                description: "P1 description",
                price: 0.1,
                image: "",
                category: "Testing",
                reviews: [],
                product: fakeProd,
                _id: "1234",
                quantity: 2
            },
            quantity: 2
        },
        {
            product: {
                id: "4321",
                name: "P2",
                description: "P2 description",
                price: 6.7,
                image: "",
                category: "Testing",
                reviews: [],
                product: fakeProd,
                _id: "4321",
                quantity: 1
            },
            quantity: 1
        }
    ];
    const doNothing = () => {};

    const { getByText } = render (
        <Router>
            <ShoppingCart
                items = { itemCarts }
                refreshCartList = {doNothing}
            />
        </Router>
    )

    // The expected messages
    expect(getByText("Shopping cart")).toBeInTheDocument();
    expect(getByText("P1 description")).toBeInTheDocument();
    expect(getByText("P2 description")).toBeInTheDocument();

    // The total ammount must be 0.1 * 2 + 6.7 = 6.9
    expect(getByText("6.90 €")).toBeInTheDocument();
});

/**
 * Test that the shopping cart is rendered correctly
 * after some or all of the items are deleted
 */
 test("Cart can have its products deleted", async() => {
    const fakeProd: Product = {} as Product;
    const itemCarts: ItemCart[] = [
        {
            product: {
                id: "1234",
                name: "P1",
                description: "P1 description",
                price: 0.5,
                image: "",
                category: "Testing",
                reviews: [],
                product: fakeProd,
                _id: "1234",
                quantity: 2
            },
            quantity: 2
        }
    ];
    const doNothing = () => {};

    const { getByText } = render (
        <Router>
            <ShoppingCart
                items = { itemCarts }
                refreshCartList = {doNothing}
            />
        </Router>
    )

    // The initial total ammount must be 0.5 * 2 = 1.0
    expect(getByText("1.00 €")).toBeInTheDocument();

    expect(getByText("P1 description")).toBeInTheDocument();
    fireEvent.click(getByText("-"));

    // The product should still be there, and ammount should update
    expect(getByText("P1 description")).toBeInTheDocument();
    expect(getByText("0.5 €")).toBeInTheDocument();

    // Reduce quantity should be disabled (quantity = 1)
    expect(getByText("-")).toBeDisabled();
    
    act(() => {
        fireEvent.click(getByText("Delete"));
    });

    // The product should no longer be there
    expect(getByText("1.00 €")).toBeInTheDocument();
});