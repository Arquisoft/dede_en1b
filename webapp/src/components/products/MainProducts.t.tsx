
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
const mockChildComponent = jest.fn();
jest.mock("./ProductCard", () => ( props: any) => {
  mockChildComponent(props);
  return <div />;
});

test("When listing products the proper function is called", async () =>{
    jest.spyOn(api, 'getProductImages').mockImplementation((id: string): Promise<string[]> => {
        return Promise.resolve(["1"]);
    });    
    jest.spyOn(api, 'getProducts').mockImplementation( (searchParams?:String):Promise<Product[]> =>{  return Promise.resolve(productsList);});
  

          await act(async () => {
            act(()=> {render(<MemoryRouter><MainProducts refreshCartList={()=> {}} /> </MemoryRouter>);});
            expect(mockChildComponent).toHaveBeenCalled();
          }); 
     
      
        
});