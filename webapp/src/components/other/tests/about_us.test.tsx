import {  render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import AboutUs from "../about_us";

/**
 * Test that the about us page renders correctly
 */
test("Cart empty is rendered correctly", async () => {

    const { getByText } = render(
        <Router>
            <AboutUs/>
        </Router>
    )

    // The expected content of the page (cards aside)
    expect(getByText("Decentralized Delivery")).toBeInTheDocument();
    expect(getByText("DeDe is an online retail system that preserves the privacy of the customers following the SOLID principles. This means that our Decentralized Delivery app will not store user data per se, but will acess, when permission is granted, the information located inside the user's SOLID pod. This information will be used by our app to know the user's address for delivery purposes.")).toBeInTheDocument();
    
});