import {  screen, render,fireEvent, queryByAttribute, getByTestId } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const getById = queryByAttribute.bind(null, 'id');



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
 * Check that wrong password will show an alert.
 */

    test('wrong password will show an alert', async () => {
        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
        const { getByText } = render(<Router><AdminLogin /></Router>);
        const email = ""
        const password = ""
        const inputEmail = screen.getByTestId("input-email")
        fireEvent.change(screen.getByTestId("input-email"), { target: { value: email } });
        fireEvent.change(screen.getByTestId("input-password"), { target: { value: password } });
        fireEvent.click(screen.getByText("Sign In"));
        expect(alertMock).toHaveBeenCalled();
    });

