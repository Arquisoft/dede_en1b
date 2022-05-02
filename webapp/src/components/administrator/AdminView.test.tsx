
 import { fireEvent, render,getByTestId,screen, act, within } from "@testing-library/react";
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

    const spy = jest.spyOn(api,"addProduct").mockImplementation(():Promise<boolean> =>  Promise.resolve(true));
    fireEvent.click(getByText("Add Product"));
    expect(spy).toHaveBeenCalledTimes(1);
});


/**
 * Test that the delete product button calls the api to delete a product.
 * 
 */

    // test('delete product button calls the api to delete a product', async () => {
    //     const { getByText } = render(<Router><AdminView /></Router>);
    //     const spy = jest.spyOn(api,"deleteProduct").mockImplementation(():Promise<boolean> =>  Promise.resolve(true));
        
    //     const autocomplete = screen.getByTestId('select-product');
    //     const input = within(autocomplete).getByRole('textbox')
    //     autocomplete.focus()
    //     // the value here can be any string you want, so you may also consider to 
    //     // wrapper it as a function and pass in inputValue as parameter
    //     fireEvent.change(input, { target: { value: 'a' } })
    //     userEvent.type(input, 'a')

    //     //set input value to "Nissan 300ZX [6247415969857467dbbd7a1e]"
    //     fireEvent.change(input, { target: { value: 'Nissan 300ZX [6247415969857467dbbd7a1e]' } })
    //     userEvent.type(input, '{enter}')
        
        
    //     fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    //     fireEvent.keyDown(autocomplete, { key: 'Enter' })
    //     //select first item in the autocomplete

    //     fireEvent.click(getByText("Delete Product"));
    //     expect(spy).toHaveBeenCalledTimes(1);
    // }
    // );
    

        
    



        