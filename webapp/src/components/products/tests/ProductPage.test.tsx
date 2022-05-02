import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProductPage from "../ProductPage";
import * as api from '../../../api/api';
import { Product } from '../../../shared/shareddtypes';
const fakeProd: Product = {} as Product;
const product =  {
    "_id": "testnissan",
    "name": "nissan",
    "price": 49.99,
    "description": "Widebody. Banana Split Yellow. A beast.",
    "image": "nissan",
    "reviews": [
      {
        "userId": "Usuario review",
        "productId": "testnissan",
        "rating": 4,
        "comment": "Muy rápido",
        "orderId":"orderId"
      }
    ],
    "quantity": 2,
    "product": fakeProd,
    "id": "testnissan",
    "color": "blue",
    "category":""
}
const productNoReview=   {
    "_id": "testnissan",
    "name": "nissan",
    "price": 49.99,
    "description": "Widebody. Banana Split Yellow. A beast.",
    "image": "nissan",
    "reviews": [
     
    ],
    "quantity": 2,
    "product": fakeProd,
    "id": "testnissan",
    "color": "blue",
    "category":""
}
/**
 * Test product page is able to render without errors
 */
 test("ProductPage is rendered correctly for product found", async() => {
    
    const doNothing = () => {
        //this is intentional
    };
    jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
        return Promise.resolve(["1"]);
      });
    const getProd = jest.spyOn(api, "getProductById").mockReturnValue(Promise.resolve(product)); 
    const addToCart = jest.spyOn(api, "addToCart");
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({
          id: '12',
        }),
      }));
    //const { getByText } =
    render (
        <Router>
            <ProductPage
                refreshCartList={doNothing}
            />
        </Router>
    );
    //waiting for images to be rendered!
    await waitFor(() => expect(getProd).toHaveBeenCalledTimes(1));
    expect(screen.getByText('nissan')).toBeInTheDocument();
    expect(screen.getByText('49.99€')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('addToCartBtn'));
    expect(addToCart).toHaveBeenCalled();
    // Without access to the state, loading behaviour
});

/**
 * Test product page is able to render without errors
 */
 test("ProductPage is rendered correctly for product not found", async() => {
    
    const doNothing = () => {
        //this is intentional
    };
    jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
        return Promise.resolve(["1"]);
      });
    const getProdEmpty = jest.spyOn(api, "getProductById").mockReturnValue(Promise.resolve(undefined)); 

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({
          id: '12',
        }),
      }));
    //const { getByText } =
    render (
        <Router>
            <ProductPage
                refreshCartList={doNothing}
            />
        </Router>
    );
    //waiting for the component to call the api
    await waitFor(() => expect(getProdEmpty).toHaveBeenCalledTimes(1));
    //when resolved it must show that no product was found
    expect(screen.getByText("No product found")).toBeInTheDocument();

});

test("ProductPage is rendered correctly for product with no reviews", async() => {
    
    const doNothing = () => {
        //this is intentional
    };
    jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
        return Promise.resolve(["1"]);
      });
    const getProdNoReview = jest.spyOn(api, "getProductById").mockReturnValue(Promise.resolve(productNoReview)); 

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({
          id: '12',
        }),
      }));
    //const { getByText } =
    render (
        <Router>
            <ProductPage
                refreshCartList={doNothing}
            />
        </Router>
    );
    //waiting for the component to call the api
    await waitFor(() => expect(getProdNoReview).toHaveBeenCalledTimes(1));
    //when resolved it must show that no product was found
    expect(screen.getByText("This product does not have any review yet.")).toBeInTheDocument();

});