import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ItemCart, Product } from "../../../shared/shareddtypes";
import CartItem from "../CartItem";

const fakeProd: Product = {} as Product;
const doNothing = () => {
    //this is intentional. For testing purposes we pass an empty function
};
const dontDelete = (_product: Product) => { 
    //this is intentional. For testing purposes we pass an empty function
};

/**
 * Test that the item cart is rendered correctly
 * from a product
 */
 test("CartItem is rendered correctly", async() => {
    
    const item: ItemCart = {
        product: {
            id: "2222",
            name: "ProductName",
            description: "Productdescription",
            price: 0.3,
            image: "",
            category: "Testing",
            reviews: [],
            product: fakeProd,
            _id: "2222",
            quantity: 9
        },
        quantity: 9
    };

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

    expect(getByText("ProductName")).toBeInTheDocument();
    expect(getByText("Productdescription")).toBeInTheDocument();
    expect(getByText("9")).toBeInTheDocument();
    expect(getByText("+")).toBeInTheDocument();
    expect(getByText("-")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
});

/**
 * Test that the item cart quantity updates correctly
 */
 test("CartItem can have quantity modified", async() => {
    
    const item: ItemCart = {
        product: {
            id: "3333",
            name: "P1",
            description: "P1 description",
            price: 0.1,
            image: "",
            category: "Testing",
            reviews: [],
            product: fakeProd,
            _id: "3333",
            quantity: 53
        },
        quantity: 53    // Intentionally high to check
    };

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