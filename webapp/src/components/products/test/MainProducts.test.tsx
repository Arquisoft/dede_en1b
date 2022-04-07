import React from 'react';
import { render, screen } from '@testing-library/react';
import MainProducts from '../MainProducts';
import * as api from '../../../api/api';
import { Product, ItemCart } from '../../../shared/shareddtypes';
import { MemoryRouter } from 'react-router-dom';

jest.mock("../../../api/api");

const productsList: Product[] = [
{
    id:"1",
    name:"bmw",
    description:"best car ever",
    price: 30,
    image: "",
    category: ""
},
{
    id:"2",
    name:"mercedes",
    description:"best car ever",
    price: 20,
    image: "",
    category: ""
}
];
test("List of producst is rendered", () =>{

    jest.spyOn(api, 'getProducts').mockImplementation( (searchParams?:String):Promise<Product[]> =>{  return Promise.resolve(productsList);});
    render(<MemoryRouter><MainProducts refreshCartList={()=> {}} /> </MemoryRouter>);

    
    


});