import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProductPage from "../ProductPage";

/**
 * Test product page is able to render without errors
 */
 test("ProductPage is rendered correctly", async() => {
    
    const doNothing = () => {};

    //const { getByText } =
    render (
        <Router>
            <ProductPage
                refreshCartList={doNothing}
            />
        </Router>
    );

    // Without access to the state, loading behaviour
});