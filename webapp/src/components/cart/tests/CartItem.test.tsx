import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ItemCart, Product } from "../../../shared/shareddtypes";
import CartItem from "../CartItem";

/**
 * Test that the item cart is rendered correctly
 * from a product
 */
 test("CartItem is rendered correctly", async() => {
    
    const fakeProd: Product = {} as Product;
    const item: ItemCart = {
        product: {
            id: "1111",
            name: "P1",
            description: "P1 description",
            price: 0.1,
            image: "",
            category: "Testing",
            reviews: [],
            product: fakeProd,
            _id: "1111",
            quantity: 53
        },
        quantity: 53    // Intentionally high to check
    };
    const doNothing = () => {};
    const dontDelete = (product: Product) => {};

    const { getByText } = render (
        <Router>
            <CartItem
                item = {item}
                updateTotal = {doNothing}
                deleteItem = {dontDelete}
                refreshCartList = {doNothing}
            />
        </Router>
    );

    expect(getByText("P1")).toBeInTheDocument();
    expect(getByText("P1 description")).toBeInTheDocument();
    expect(getByText("53")).toBeInTheDocument();
    expect(getByText("+")).toBeInTheDocument();
    expect(getByText("-")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
});

/**
 * Test that the item cart quantity updates correctly
 */
 test("CartItem can have quantity modified", async() => {
    
    const fakeProd: Product = {} as Product;
    const item: ItemCart = {
        product: {
            id: "1111",
            name: "P1",
            description: "P1 description",
            price: 0.1,
            image: "",
            category: "Testing",
            reviews: [],
            product: fakeProd,
            _id: "1234",
            quantity: 53
        },
        quantity: 53    // Intentionally high to check
    };
    const doNothing = () => {};
    const dontDelete = (product: Product) => {};

    const { getByText } = render (
        <Router>
            <CartItem
                item = {item}
                updateTotal = {doNothing}
                deleteItem = {dontDelete}
                refreshCartList = {doNothing}
            />
        </Router>
    )

    expect(getByText("53")).toBeInTheDocument();

    // Decrease quantity by 3
    fireEvent.click(getByText("-"));
    fireEvent.click(getByText("-"));
    fireEvent.click(getByText("-"));

    // Should be 50 units now
    expect(getByText("50")).toBeInTheDocument();

    // Increase quantity by 2
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("+"));

    // Should be 52 units now
    expect(getByText("52")).toBeInTheDocument();
});