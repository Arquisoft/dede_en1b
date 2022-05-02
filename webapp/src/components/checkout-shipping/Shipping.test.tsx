import { render,screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Shipping from "./Shipping";
// @ts-ignore
import { LocalStorageMock } from '@react-mock/localstorage';



/**
 * Check that login message appear if user  is found
 */


test('login message appear', async () => {
    const emptyFunction = () => {};
    const { getByText } = render(<Router><Shipping refreshCartList={emptyFunction} /></Router>);
    expect(screen.getByTestId("message")).toHaveTextContent("Please, Log In or register via Inrupt or SOLID");
});

/**
 * Check shipping component with non existing webId
 */

test('shipping component with webId', async () => {
    const emptyFunction = () => {};
    const { getByText } = render(<Router><LocalStorageMock items={{webId:"test"}}><Shipping refreshCartList={emptyFunction} /></LocalStorageMock></Router>);
    expect(getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(getByText("Shipping Information")).toBeInTheDocument();

});

