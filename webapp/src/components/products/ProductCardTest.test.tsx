
import {  act, render, screen } from '@testing-library/react';
import MainProducts from './MainProducts';
import * as api from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

jest.mock("../../api/api");

const productsList = [
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
 
},{
    "id":"2",
    "name":"nissan",
    "description":"nissan good",
    "price": 30,
    "image": "",
    "category": "",
    "reviews": [],
    "quantity":2,
    "product": "",
    "_id": "2"
}
];
test("Product card is rendered properly", async () =>{

jest.spyOn(api, 'getProducts').mockImplementation( (searchParams?:String):Promise<Product[]> =>{  return Promise.resolve(productsList);});
jest.spyOn(api, 'getProductImages').mockImplementation((id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
});    
await act( async () => {
        render(<MemoryRouter><ProductCard product={productsList[0]} refreshCartList={()=> {}} /> </MemoryRouter>);
        expect(screen.getByText('bmw')).toBeInTheDocument();
        expect(screen.getByText('30€')).toBeInTheDocument();
        expect(screen.getByText('Add to cart')).toBeInTheDocument();
     
    });
       
    
    

});






