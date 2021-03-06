import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ShoppingCart from "../ShoppingCart";
import { ItemCart, Product } from "../../../shared/shareddtypes";

import * as api from '../../../api/api';
const doNothing = () => {
    //this is intentional for testing purposes. We won't be using a proper refreshCarList so we'll pass this empty function. to the component
};
const fakeProd: Product = {} as Product;

/**
 * Test that the shopping cart is rendered correctly
 * when empty
 */
test("Cart empty is rendered correctly", async () => {

  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
    const { getByText } = render(
        <Router>
            <ShoppingCart
                items={[]}
                refreshCartList={doNothing}
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
test("Cart with products is rendered correctly", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  const img = jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
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

    const { getByText } = render(
        <Router>
            <ShoppingCart
                items={itemCarts}
                refreshCartList={doNothing}
            />
        </Router>
    )

    // The expected messages
    expect(getByText("Shopping cart")).toBeInTheDocument();
    expect(getByText("P1 description")).toBeInTheDocument();
    expect(getByText("P2 description")).toBeInTheDocument();
    
    // The total ammount must be 0.1 * 2 + 6.7 = 6.9
    //expect(getByText("6.90 €")).toBeInTheDocument();
});

/**
 * Test that the shopping cart is rendered correctly
 * after some or all of the items are deleted
 */
test("Cart can have its products deleted", async () => {
      //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
    const cartWithOneItem: ItemCart[] = [
        {
            product: {
                id: "9999",
                name: "P0",
                description: "P0 description",
                price: 0.5,
                image: "",
                category: "Testing",
                reviews: [],
                product: fakeProd,
                _id: "9999",
                quantity: 2
            },
            quantity: 2
        }
    ];

    const mockAPI = jest.spyOn(api, "deleteFromCart");
    const { getByText } = render(
        <Router>
            <ShoppingCart
                items={cartWithOneItem}
                refreshCartList={doNothing}
            />
        </Router>
    )

    // The initial total ammount must be 0.5 * 2 = 1.0
    // eslint-disable-next-line testing-library/prefer-find-by
    //expect(getByText("1.00 €")).toBeInTheDocument();
    expect(screen.getByTestId('it9999')).toBeInTheDocument();
    fireEvent.click(getByText("-"));

    // The product should still be there, and ammount should update
    expect(getByText("P0 description")).toBeInTheDocument();
    expect(getByText("0.5 €")).toBeInTheDocument();

    // Reduce quantity should be disabled (quantity = 1)
    expect(getByText("-")).toBeDisabled();
    expect(screen.getByTestId("9999-delete")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("9999-delete"));
    await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));
   //we cannot test view is changed as this is done by the function 'refreshCarList'.
});