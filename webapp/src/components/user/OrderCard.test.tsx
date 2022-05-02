

/**
 * Test that the OrderAdminCard component is working as expected with a product.
 */

 import { render } from "@testing-library/react";
 import { ItemCart, Order, Product } from "../../shared/shareddtypes";
 import OrderCard from "./OrderCard";
 
 
 test('order admin card component can be rendered with a product', async () => {
     const order:Order = {
         userId: "1",
         products: [{
             productId: "1",
             product: {
                 id: "1",
                 name: "Product 1",
                 description: "Product 1 description",
                 price: 10,
                 image: "",
                 category: "Test",
                 reviews: [],
                 product: {} as Product,
                 _id: "1",
                 quantity: 2
             },
             reviewed: false,
             quantity: 1,
             price:79.99
         }],
         subTotal: 69.99,
         deliveryPrice: 30,
         address: "Test address",
         createdAt: new Date("2022-05-02T16:13:17.026+00:00"),
         id: "1",
     }
         
     const { getByText } = render(<OrderCard order={order} />);
     expect(getByText("Order Mon May 02")).toBeInTheDocument();
     expect(getByText("Total: 69.99 €")).toBeInTheDocument();
     expect(getByText("Shipping cost: 30 €")).toBeInTheDocument();
 }
     , 30000);
     