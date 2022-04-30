import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";

import rproducts from '../routes/product.routes';
import rusers from '../routes/user.routes';
import rorders from '../routes/order.routes';


require('dotenv').config({path:__dirname+'/./../.env'});
let config = {
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
}

// unable to form by composition
const conn = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URI}/${config.DB_NAME}`;

let app: Application;
let server: http.Server;

beforeAll(async () => {
    app = express();
    
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };

    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", rproducts, rusers, rorders);

    mongoose.connect(conn,{    authSource : "admin",
})
        .then(db => console.log("DB is connected")) 
        .catch(err => console.error(err));

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close()                  // close the server
    mongoose.disconnect();          // close connection with DB
});

/** TESTS FOR PRODUCT **/
describe('product ', () => {

    /**
     * Test that we can list all products without any error.
     */
    it('can be listed', async () => {
        const response:Response = await request(app).get("/api/products");
        
        // Result in JSON format
        expect(response.type).toEqual("application/json");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that we can save products without errors.
     */
    it('can be saved', async () => {
        let newProduct:Object = {
            name: 'newProduct',
            description: 'A new product for testing purposes',
            price: 5.0,
            category: 'testing',
            base64Images: [
                "image1",
                "image2",
                "image3"
            ],
        }

        const response:Response = await request(app).post("/api/product")
            .send(newProduct);
        expect(response.statusCode).toBe(201);
    });

    /**
     * Test that, when accessed, a product that exists:
     * - can be recovered without problems
     * - returns a JSON response type
     * - returns the appropiate product (checking name)
     */
    it('can be accessed', async () => {
        let id = "6247415969857467dbbd7a1e";  // Nissan 300ZX id

        const response:Response = await request(app).get("/api/products/" + id);
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(response.body.name).toEqual("Nissan 300ZX");
    });

    /**
    * Test that, when accessed, a product that doesn't exist gives an error
    */
    it('cannot be accessed if not real', async () => {
        let id = "56194546fake";    // non-existant id

        const response:Response = await request(app).get("/api/products/" + id);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("Product Not Found");
    });
});

/** TESTS FOR ORDER **/
describe('order ', () => {

    /**
     * Test that we get all the orders without errors
     */
    it('can be listed', async () => {
        const response:Response = await request(app).get("/api/orders");
   
        // Result in JSON format
        expect(response.type).toEqual("application/json");
    });

    /**
     * Test that we can save an empty order with no errors.
     */
    it('cannot be saved empty', async () => {
        let order:Object = {
            userId: 'testingUID',
            products: [],
            deliveryPrice: 570.6,
            address: "Cualquier lugar"
        }

        const response:Response = await request(app).post("/api/order")
            .send(order);
        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual("application/json");
        expect(response.body.message).toEqual("Order saved");
    });

    /**
     * Test that we can save a non-empty order with no errors.
     */
    it('can be saved non-empty', async () => {
        let order:Object = {
            userId: "user_test_id",
            products: [
                {
                    // barracuda ID
                    productId: "624741b769857467dbbd7a22",
                    quantity: 1
                },
                {
                    // toyota ID
                    productId: "6247418c69857467dbbd7a20",
                    quantity: 2
                },
            ],
            deliveryPrice: 9.1,
            address: "Oviedo, Asturias, España"
        }

        const response:Response = await request(app).post("/api/order")
            .send(order);
        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual("application/json");
        expect(response.body.message).toEqual("Order saved");
    });

    /**
     * Test that we get errors when saving non-existent products in order.
     */
    it('cannot be saved with wrong products', async () => {
        let order:Object = {
            userId: "another_user_id",
            products: [
                {
                    productId: "14532659nope",
                    quantity: 1
                }
            ],
            deliveryPrice: 4.4,
            address: "Cualquier lugar"
        }

        const response:Response = await request(app).post("/api/order")
            .send(order);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Wrong order values");
    });

    /**
     * Test that we get errors when not specifying quantity.
     */
    it('cannot be saved without quantity', async () => {
        let order:Object = {
            userId: "third_user_id",
            products: [
                {
                    productId: "624741b769857467dbbd7a22"
                }
            ],
            deliveryPrice: 9.9,
            address: "Cualquier lugar"
        }

        const response:Response = await request(app).post("/api/order")
            .send(order);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Order cannot be saved");
    });

    /**
     * Test that an added order can be accesed for the user.
     */
    it('can be accessed', async () => {
        let userId = "user_test_id";
        const response:Response = await request(app).post("/api/order/find")
            .send(userId);

        // Result in JSON format
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
    });
});

/** TESTS FOR USER (ADMIN) **/
/* non-active for now
describe('user ', () => {
    it('can be registered', async () => {
        const response:Response = await request(app).post("/api/register").send({
            email: "test@email.com",
            name: "test",
            lastName: "testington",
            password: "pass123",
            PODUrl: "https://pod.inrupt.com/test/"
        });
        expect(response.statusCode).toBe(201);  // Success
    });
    //, 500000);    // increased timeout

    it('can log in', async () => {
        const response:Response = await request(app).post("/api/login").send({
            email: "test@email.com",
            password: "pass123"
        });
        expect(response.statusCode).toBe(201);  // Success
    });
    //, 500000);    // increased timeout

    it('can be listed', async () => {
        const response:Response = await request(app).get("/api/users");
        expect(response.statusCode).toBe(200);
    });
});
*/