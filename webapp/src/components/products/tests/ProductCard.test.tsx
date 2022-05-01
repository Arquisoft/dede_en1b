import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ItemCart, Product } from "../../../shared/shareddtypes";
import { act } from "react-dom/test-utils";
import ProductCard from "../ProductCard";

/**
 * Test that the product card can be rendered without errors
 */
 test("ProductCard is rendered correctly", async() => {
    
    const fakeProd: Product = {} as Product;
    const prod: Product = {
        id: "5555",
        name: "Realistically long name",
        description: "P1 description",
        price: 88.8,
        image: "",
        category: "Testing",
        reviews: [],
        product: fakeProd,
        _id: "5555",
        quantity: 0
    };
    const doNothing = () => {};

    const { getByText } = render (
        <Router>
            <ProductCard
                product={prod}
                refreshCartList = {doNothing}
            />
        </Router>
    );

    // ALL the expected elements appear in the card
    expect(getByText("Realistically long name")).toBeInTheDocument();
    expect(getByText("88.8€")).toBeInTheDocument();
    expect(getByText("Add to cart")).toBeInTheDocument();
});

/**
 * Test that the product card can be rendered without errors
 */
 test("ProductCard is rendered correctly", async() => {
    
    const fakeProd: Product = {} as Product;
    const prod: Product = {
        id: "5555",
        name: "Realistically long name",
        description: "My description",
        price: 88.8,
        image: "",
        category: "Testing",
        reviews: [],
        product: fakeProd,
        _id: "5555",
        quantity: 0
    };
    const doNothing = () => {};

    const { getByText } = render (
        <Router>
            <ProductCard
                product={prod}
                refreshCartList = {doNothing}
            />
        </Router>
    );

    // ALL the expected elements appear in the card
    expect(getByText("Realistically long name")).toBeInTheDocument();
    expect(getByText("88.8€")).toBeInTheDocument();
    expect(getByText("Add to cart")).toBeInTheDocument();
});

/**
 * Test that the product's actions don't crash
 */
 test("ProductCard handles adding", async() => {
    
    const fakeProd: Product = {} as Product;
    const prod: Product = {
        id: "5555",
        name: "P0",
        description: "P0 description",
        price: 88.8,
        image: "",
        category: "Testing",
        reviews: [],
        product: fakeProd,
        _id: "5555",
        quantity: 0
    };
    const spyable = jest.fn();

    const { getByText } = render (
        <Router>
            <ProductCard
                product={prod}
                refreshCartList = {spyable}
            />
        </Router>
    );

    // Should call the provided funtion and stay in page
    fireEvent.click(getByText("Add to cart"));
    expect(spyable).toHaveBeenCalled();
    // Should change page (mockup doesn't)
    fireEvent.click(getByText("P0"));
});