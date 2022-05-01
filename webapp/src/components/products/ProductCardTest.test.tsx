
import React from 'react'
import { render, screen } from '@testing-library/react';

import * as api from '../../api/api';

import { MemoryRouter } from 'react-router-dom';

import ProductCard from './ProductCard';
import { ItemCart, Product } from '../../shared/shareddtypes';

jest.mock("../../api/api");
const fakeProd: Product = {} as Product;
const productTest = 
{
    "id":"1",
    "name":"bmw",
    "description":"best car ever",
    "price": 30,
    "image": "",
    "category": "",
    "reviews": [],
    "quantity":2,
    "product": fakeProd,
    "_id": "1"
 
}
/*
When a product card has been passed a functional product it renders its corresponding card properly and with propper functionality
*/
test("Product card is rendered properly", async () =>{


jest.spyOn(api, 'getProductImages').mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
});
jest.spyOn(api, 'addToCart').mockImplementation((itemCart: ItemCart, factor: number = 1): void  => {
    //doNothing as I'm only testing this function is being called when clicking on add...
});

        const dummy = () => {
            //This is intentional as we won't be checking whether the Cart component is updated or not
        };
        render(<MemoryRouter><ProductCard product={productTest} refreshCartList={dummy} /> </MemoryRouter>);

        expect(screen.getByText('bmw')).toBeInTheDocument();
        expect(screen.getByText('30€')).toBeInTheDocument();
        expect(screen.getByText('Add to cart')).toBeInTheDocument();
        expect(screen.getByAltText('bmw')).toBeInTheDocument();
        expect(api.getProductImages).toHaveBeenCalled();
        screen.getByTestId('add-cart-button').click();
        expect(api.addToCart).toHaveBeenCalled();
        expect(api.addToCart).toHaveBeenCalledWith({product:productTest, quantity:1});

});





