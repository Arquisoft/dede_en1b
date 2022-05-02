
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import MainProducts from '../MainProducts';
import * as api from '../../../api/api';
import { Product } from '../../../shared/shareddtypes';
import { MemoryRouter } from 'react-router-dom';


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
    "_id": "prod1",
    "color": "blue"

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
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional for testing purposes
  }} /> </MemoryRouter>);

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
  expect(screen.getByTestId('minPricePanel')).toBeInTheDocument();
  expect(screen.getByTestId('maxPricePanel')).toBeInTheDocument();


});

test("When listing products the proper function is called", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getProducts = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve(productsList));

  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional for testing purposes
  }} /> </MemoryRouter>);
  //When we first render the component, it will make an API call to getProducts.
  expect(screen.getByText('Loading products!!')).toBeInTheDocument();
  //We neeed to wait for the loader to be removed!!!!
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  //We make sure getProducts is called
  await waitFor(() => expect(getProducts).toHaveBeenCalledTimes(1));

  //We check that we can see both products info
  expect(screen.getByText('bmw')).toBeInTheDocument();
  expect(screen.getByAltText('bmw')).toBeInTheDocument();
  expect(screen.getByText('nissan')).toBeInTheDocument();
  expect(screen.getByAltText('nissan')).toBeInTheDocument();

  expect(api.getProductImages).toHaveBeenCalledWith(productsList[0].id);
  expect(api.getProductImages).toHaveBeenCalledWith(productsList[1].id);
  expect(getProducts).toHaveBeenCalledWith("");
});



test("When listing products, use filter by color works as expected", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColor = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve(productsList));

  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //We neeed to wait for the loader to be removed!!!!
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  //We make sure getProducts is called
  await waitFor(() => expect(getByColor).toHaveBeenCalledTimes(1));

  //We check that we can see both products info
  expect(screen.getByText('bmw')).toBeInTheDocument();
  expect(screen.getByAltText('bmw')).toBeInTheDocument();
  expect(screen.getByText('nissan')).toBeInTheDocument();
  expect(screen.getByAltText('nissan')).toBeInTheDocument();
  let filter = screen.getByTestId("openFilterBtn");
  expect(filter).toBeInTheDocument();
  fireEvent.click(filter);


  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  expect(screen.getByText('Color')).toBeInTheDocument();
  let colorChooser = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooser).toBeInTheDocument();
  fireEvent.mouseDown(colorChooser);

  await waitFor(() => expect(screen.getByTestId("yellow")).toBeVisible());
  let yellowOpt = screen.getByTestId("yellow");
  fireEvent.click(yellowOpt);
  //we cannot expect to see the content changed to yellow cars as we're mocking the API call..
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=yellow");

  fireEvent.click(screen.getByTestId("orange"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=orange");

  fireEvent.click(screen.getByTestId("red"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=red");

  fireEvent.click(screen.getByTestId("gray"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=gray");

  fireEvent.click(screen.getByTestId("green"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=green");

  fireEvent.click(screen.getByTestId("blue"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=blue");

  fireEvent.click(screen.getByTestId("white"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=white");

  fireEvent.click(screen.getByTestId("black"));
  expect(getByColor).toHaveBeenCalledWith("&color[eq]=black");
});
test("When listing products, use filter by color gray works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorGray = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));

  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);


  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));


  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserGray = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserGray).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserGray);

  await waitFor(() => expect(screen.getByTestId("gray")).toBeVisible());
  let grayOpt = screen.getByTestId("gray");
  fireEvent.click(grayOpt);

  //we cannot expect to see the content changed to gray cars as we're mocking the API call..
  expect(getByColorGray).toHaveBeenCalledWith("&color[eq]=gray");


  
});
test("When listing products, use filter by color orange works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorOrange = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));

  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserOrange = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserOrange).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserOrange);

  await waitFor(() => expect(screen.getByTestId("orange")).toBeVisible());
  let orangeOpt = screen.getByTestId("orange");
  fireEvent.click(orangeOpt);

  //we cannot expect to see the content changed to orange cars as we're mocking the API call..
  expect(getByColorOrange).toHaveBeenCalledWith("&color[eq]=orange");


  
});

test("When listing products, use filter by color red works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorRed = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));

  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserRed = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserRed).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserRed);

  await waitFor(() => expect(screen.getByTestId("red")).toBeVisible());
  let redOpt = screen.getByTestId("red");
  fireEvent.click(redOpt);

  //we cannot expect to see the content changed to red cars as we're mocking the API call..
  expect(getByColorRed).toHaveBeenCalledWith("&color[eq]=red");

});

test("When listing products, use filter by color green works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorGreen = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));

  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserGreen = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserGreen).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserGreen);

  await waitFor(() => expect(screen.getByTestId("green")).toBeVisible());
  let greenOpt = screen.getByTestId("green");
  fireEvent.click(greenOpt);

  //we cannot expect to see the content changed to green cars as we're mocking the API call..
  expect(getByColorGreen).toHaveBeenCalledWith("&color[eq]=green");

});
test("When listing products, use filter by color blue works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorBlue = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));

  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserBlue = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserBlue).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserBlue);

  await waitFor(() => expect(screen.getByTestId("blue")).toBeVisible());
  let blueOpt = screen.getByTestId("blue");
  fireEvent.click(blueOpt);

  //we cannot expect to see the content changed to blue cars as we're mocking the API call..
  expect(getByColorBlue).toHaveBeenCalledWith("&color[eq]=blue");

});
test("When listing products, use filter by color white works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorWhite = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));

  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserWhite = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserWhite).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserWhite);

  await waitFor(() => expect(screen.getByTestId("white")).toBeVisible());
  let whiteOpt = screen.getByTestId("white");
  fireEvent.click(whiteOpt);

  //we cannot expect to see the content changed to white cars as we're mocking the API call..
  expect(getByColorWhite).toHaveBeenCalledWith("&color[eq]=white");

});

test("When listing products, use filter by color black works", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByColorBlack = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve([]));
  render(<MemoryRouter><MainProducts refreshCartList={() => {
    //intentional testing purposes
  }} /> </MemoryRouter>);

  //open filtering
  fireEvent.click(screen.getByTestId("openFilterBtn"));

  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  let colorChooserBlack = screen.getByTestId("colorPanel").firstChild as HTMLElement;
  expect(colorChooserBlack).toBeInTheDocument();
  fireEvent.mouseDown(colorChooserBlack);

  await waitFor(() => expect(screen.getByTestId("black")).toBeVisible());
  let blackOpt = screen.getByTestId("black");
  fireEvent.click(blackOpt);

  //we cannot expect to see the content changed to red cars as we're mocking the API call..
  expect(getByColorBlack).toHaveBeenCalledWith("&color[eq]=black");

});

test("When listing products, use filter by brand works as expected", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByBrand = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve(productsList));

  render(<MemoryRouter><MainProducts refreshCartList={() => { // intentional for testing
  }} /> </MemoryRouter>);

  //We neeed to wait for the loader to be removed!!!!
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  //We make sure getProducts is called
  await waitFor(() => expect(getByBrand).toHaveBeenCalledTimes(1));


  let filter = screen.getByTestId("openFilterBtn");
  expect(filter).toBeInTheDocument();
  fireEvent.click(filter);


  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());

  expect(screen.getByText('Brand')).toBeInTheDocument();
  let brandChooser = screen.getByTestId("brandPanel").firstChild as HTMLElement;
  expect(brandChooser).toBeInTheDocument();
  fireEvent.mouseDown(brandChooser);

  await waitFor(() => expect(screen.getByTestId("brandOptions")).toBeVisible());
  await waitFor(() => expect(screen.getByTestId("Toyota")).toBeVisible());
  let toyotaOpt = screen.getByTestId("Toyota");
  fireEvent.click(toyotaOpt);
  //we cannot expect to see the content changed to Toyota cars as we're mocking the API call..
  //thus, we can only test the parameters passed to the API
  expect(getByBrand).toHaveBeenCalledWith("&brand[eq]=Toyota");
});        

test("When listing products, use filter by rating works as expected", async () => {
  //We need to mock this function as the ProductCard calls it in order to render the img of each product.
  jest.spyOn(api, "getProductImages").mockImplementation((_id: string): Promise<string[]> => {
    return Promise.resolve(["1"]);
  });
  //The products are retrieved from the getProducts method of the API. 
  const getByRating = jest.spyOn(api, "getProducts").mockReturnValue(Promise.resolve(productsList));

  render(<MemoryRouter><MainProducts refreshCartList={() => { // intentional for testing
  }} /> </MemoryRouter>);

  //We neeed to wait for the loader to be removed!!!!
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  //We make sure getProducts is called
  await waitFor(() => expect(getByRating).toHaveBeenCalledTimes(1));


  let filter = screen.getByTestId("openFilterBtn");
  expect(filter).toBeInTheDocument();
  fireEvent.click(filter);


  await waitFor(() => expect(screen.getByTestId("drawer-filter")).toBeInTheDocument());


  //we cannot expect to see the content changed to cars rated with 1 star as we're mocking the API call..
  //thus, we can only test the parameters passed to the API

  let pricePn = screen.getByTestId('ratingPanel').firstChild as HTMLElement;
  pricePn.click();
  expect(getByRating).toHaveBeenCalledWith("&rating[gte]=1");
});      

