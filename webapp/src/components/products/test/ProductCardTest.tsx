import React from 'react';
import { render, screen } from '@testing-library/react';
import MainProducts from '../MainProducts';
import * as api from '../../../api/api';
import { Product, ItemCart } from '../../../shared/shareddtypes';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

jest.mock("../../../api/api");

const productsList = [
{
    "id":"1",
    "name":"bmw",
    "description":"best car ever",
    "price": 30,
    "image": "",
    "category": "",
    "numImages":1,
    "product": ""

}
];
test("List of producst is rendered", () =>{

jest.spyOn(api, 'getProducts').mockImplementation( (searchParams?:String):Promise<Product[]> =>{  return Promise.resolve(productsList);});
    render(<MemoryRouter><ProductCard product={productsList[0]} refreshCartList={()=> {}} /> </MemoryRouter>);
    expect(screen.getByText('bmw')).toBeInTheDocument();
    expect(screen.getByText('30€')).toBeInTheDocument();
});