
 import { fireEvent, render,getByTestId,screen, act } from "@testing-library/react";
import AdminView from "./AdminView";
import { BrowserRouter as Router } from "react-router-dom";
import * as api from "../../api/api";
import userEvent from "@testing-library/user-event";




/**
 * Check that admin view component can be rendered without any error.
 */


    test('admin view component can be rendered', async () => {
        const { getByText } = render(<Router><AdminView /></Router>);
        expect(getByText("Add Product:")).toBeInTheDocument();
        expect(getByText("Delete a product:")).toBeInTheDocument();
        expect(getByText("All Orders:")).toBeInTheDocument();
    });
    
/**
 * Test that the add product button calls the api to add a product.
 */



 test('add product button calls the api to add a product', async () => {
    const { getByText } = render(<Router><AdminView /></Router>);
    const name = "Product 1"
    const description = "Product 1 description"
    const price = 69.99
    const image = ""
    const category = "Test"
    // fireEvent.change(screen.getByTestId("input-name"), { target: { value: name } });
    let a = screen.getByTestId("input-name");
    userEvent.type(a!, description );
    // fireEvent.change(screen.getByTestId("input-price"), { target: { value: price } });
    // fireEvent.change(screen.getByTestId("input-image"), { target: { value: image } });
    // fireEvent.change(screen.getByTestId("input-category"), { target: { value: category } });
    const spy = jest.spyOn(api,"addProduct");
    fireEvent.click(getByText("Add Product"));
    expect(spy).toHaveBeenCalledTimes(1);
});
    

        