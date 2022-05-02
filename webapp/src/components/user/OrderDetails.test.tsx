
/**
 * Check that orderAdminDetails component can be rendered without any error.
 */

 import { getByText, render } from "@testing-library/react";
 import { Product } from "../../shared/shareddtypes";
 import OrderDetails from "./OrderDetails";
 
     test('orderAdminDetails component can be rendered', async () => {
         const product = {
             productId: "1",
             product: {
                 id: "1",
                 name: "Product 1",
                 description: "Product 1 description",
                 price: 79.99,
                 image: "",
                 category: "Test",
                 reviews: [],
                 product: {} as Product,
                 _id: "1",
                 quantity: 3
             },
             reviewed: false,
             quantity: 3,
             price:79.99
         }
         const { getByText } = render(<OrderDetails productOrdered={product} orderId={"1"}/>);
         expect(getByText("Product 1")).toBeInTheDocument();
         expect(getByText("79.99€/unit - 3 units")).toBeInTheDocument();
     })