import {  screen, render,fireEvent, queryByAttribute, getByTestId } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as api from "../../api/api";
import AdminLogin from "./AdminLogin";




/**
 * Check that admin login component can be rendered without any error.
 */

    test('admin login component can be rendered', async () => {
        const { getByText } = render(<Router><AdminLogin /></Router>);
        expect(screen.getByText("Sign in")).toBeInTheDocument();
        expect(screen.getByText("Email Address")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
    });


/**
 * Sign in button calls the api to sign in.
 */

    test('sign in button calls the api to sign in', async () => {
        const { getByText } = render(<Router><AdminLogin /></Router>);
        const e = "a"
        const p = "a"
        fireEvent.change(screen.getByTestId("input-email"), { target: { value: e } });
        fireEvent.change(screen.getByTestId("input-password"), { target: { value: p } });
        const spy = jest.spyOn(api,"adminLogin");
        fireEvent.click(screen.getByText("Sign In"));
        expect(spy).toHaveBeenCalledTimes(1);
    });