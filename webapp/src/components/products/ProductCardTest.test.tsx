
import React from 'react'
import { render, screen } from '@testing-library/react';

import * as api from '../../api/api';

import { MemoryRouter } from 'react-router-dom';

import ProductCard from './ProductCard';

jest.mock("../../api/api");

const productsList = 
{
    "id":"1",
    "name":"bmw",
    "description":"best car ever",
    "price": 30,
    "image": "",
    "category": "",
    "reviews": [],
    "quantity":2,
    "product": "",
    "_id": "1"
 
}
/*
When a product card has been passed a functional product it renders its corresponding card properly and with propper functionality
*/
test("Product card is rendered properly", async () =>{


jest.spyOn(api, 'getProductImages').mockImplementation((id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
});
const prodCardImpl = require('./ProductCard');

//const addCart = jest.spyOn(prodCardImpl, 'addProduct');  needs to be tested that it's called when clicking on 'add to cart'

        render(<MemoryRouter><ProductCard product={productsList} refreshCartList={()=> {}} /> </MemoryRouter>);

        expect(screen.getByText('bmw')).toBeInTheDocument();
        expect(screen.getByText('30€')).toBeInTheDocument();
        expect(screen.getByText('Add to cart')).toBeInTheDocument();
        expect(screen.getByAltText('bmw')).toBeInTheDocument();

});






