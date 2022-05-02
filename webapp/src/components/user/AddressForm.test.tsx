import { screen, render } from "@testing-library/react";

import AddressForm from './AddressForm';

import userEvent from "@testing-library/user-event";

import { ReactNotifications } from "react-notifications-component";
/**
 * Chek that the CheckoutItem component is working as expected with a product.
 */

 
    test('Check alert is shown when an address field is missing', async () => {
     
        render(<div><ReactNotifications/><div><AddressForm/></div></div>);
        expect(screen.getByTestId("street-input")).toBeInTheDocument();
        expect(screen.getByTestId("locality-input")).toBeInTheDocument();
        expect(screen.getByTestId("zipcode-input")).toBeInTheDocument();
        expect(screen.getByTestId("country-input")).toBeInTheDocument();
        expect(screen.getByText("Example: Valdés Salas.")).toBeInTheDocument();
        expect(screen.getByText("Example: Oviedo.")).toBeInTheDocument();
        expect(screen.getByText("Example: 33007.")).toBeInTheDocument();
        expect(screen.getByText("Example: Spain.")).toBeInTheDocument();
        expect(screen.getByText('Set Address')).toBeInTheDocument();
        userEvent.click(screen.getByText('Set Address'));
        expect(screen.getByText('Attention!')).toBeInTheDocument();
        expect(screen.getByText('Please, fill all form fields.')).toBeInTheDocument();
      
    })