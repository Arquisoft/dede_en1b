
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import MainProducts from './MainProducts';
import * as api from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import { MemoryRouter } from 'react-router-dom';
import { containerClasses } from '@mui/material';
import userEvent from '@testing-library/user-event';

const fakeProd: Product = {} as Product;
const productsList = [
  {
    "id": "prod1",
    "name": "bmw",
    "description": "best car ever",
    "price": 30,
    "image": "",
    "category": "",
    "reviews": [],
    "quantity": 2,
    "product": fakeProd,
    "_id": "prod1"

  }, {
    "id": "prod2",
    "name": "nissan",
    "description": "nissan good",
    "price": 20,
    "image": "",
    "category": "",
    "reviews": [],
    "quantity": 2,
    "product": fakeProd,
    "_id": "prod2",
    "color": "yellow"
  },
];

test("Filter is rendered properly", async () => {
  jest.spyOn(api, "getProductImages").mockImplementation((id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => { }} /> </MemoryRouter>);

  expect(screen.getByText('Loading products!!')).toBeInTheDocument();
  let filter = screen.getByTestId("openFilterBtn");
  expect(filter).toBeInTheDocument();
  fireEvent.click(filter);
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());
  //wait time to load drawer
  await new Promise((r) => setTimeout(r, 2000));
  expect(screen.getByText('Color')).toBeInTheDocument();
  expect(screen.getByText('Brand')).toBeInTheDocument();
  expect(screen.getByText('Min Price')).toBeInTheDocument();
  expect(screen.getByText('Max Price')).toBeInTheDocument();
  expect(screen.getByText('Rating')).toBeInTheDocument();
});

test("When listing products the proper function is called", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const mockAPI = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve(productsList));

  render(<MemoryRouter><MainProducts refreshCartList={() => { }} /> </MemoryRouter>);
  //When we first render the component, it will make an API call to getProducts.
  expect(screen.getByText('Loading products!!')).toBeInTheDocument();
  //We neeed to wait for the loader to be removed!!!!
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  //We make sure getProducts is called
  await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));

  //We check that we can see both products info
  expect(screen.getByText('bmw')).toBeInTheDocument();
  expect(screen.getByAltText('bmw')).toBeInTheDocument();
  expect(screen.getByText('nissan')).toBeInTheDocument();
  expect(screen.getByAltText('nissan')).toBeInTheDocument();

  expect(api.getProductImages).toHaveBeenCalledWith(productsList[0].id);
  expect(api.getProductImages).toHaveBeenCalledWith(productsList[1].id);
  expect(mockAPI).toHaveBeenCalledWith("");
});


 
