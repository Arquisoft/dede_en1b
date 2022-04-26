import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import mongoose  from "mongoose";
import config from "../db/keys";

import rproducts from '../routes/product.routes';
import rusers from '../routes/user.routes';
import rorders from '../routes/order.routes';

// compose connection string from keys
const conn = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URI}/${config.DB_NAME}`;

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", rproducts, rusers, rorders);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close()                  // close the server
})

/** TESTS FOR USER (ADMIN) **/  // non-active for now
/* describe('user ', () => {
    it('can be registered', async () => {
        const response:Response = await request(app).post("/register").send({
            email: "test@email.com",
            name: "test",
            lastName: "testington",
            password: "pass123",
            PODUrl: "https://pod.inrupt.com/test/"
        });
        expect(response.statusCode).toBe(201);  // Success
    });
    //, 500000);    // increased timeout (?)

    it('can log in', async () => {
        const response:Response = await request(app).post("/login").send({
            email: "test@email.com",
            password: "pass123"
        });
        expect(response.statusCode).toBe(201);  // Success
    });
    //, 500000);    // increased timeout (?)

    it('can be listed', async () => {
        const response:Response = await request(app).get("/users");
        expect(response.statusCode).toBe(200);
    });
}); */

/** TESTS FOR PRODUCT **/
describe('product ', () => {

    test("CRASH", (done) => {
        request(app).get("/").expect(400);
    })

    /**
     * Test that we can list all products without any error.
     */
    it('can be listed', async () => {
        const response:Response = await request(app).get("/products");
        // Resultado en formato JSON
        expect(response.type).toEqual("application/json");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that we can add products without errors.
     */
    it('can be added', async () => {
        let product:Object = {
            id: '1432',
            name: 'testProduct',
            description: 'A product just for testing purposes',
            price: 7.7,
            image: 'no image',
            category: 'testing only',
            numImages: 1
        }

        const response:Response = await request(app).post("/product")
            .send(product);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that the added product can be accessed without errors.
     */
    it('can be added', async () => {
        const response:Response = await request(app).get("/product/1432");
        // Resultado en formato JSON
        expect(response.type).toEqual("application/json");
        expect(response.statusCode).toBe(200);
    });
});

/** TESTS FOR ORDER **/
describe('order ', () => {

    /**
     * Test that we get all the orders without errors
     */
     it('can be listed', async () => {
        const response:Response = await request(app).get("/orders");
        // Resultado en formato JSON
        expect(response.type).toEqual("application/json");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that we can save an empty order when completed with no errors.
     */
    it('can be saved', async () => {
        let order:Object = {
            userId: 'testingUID',
            products: {},
            subTotal: 555.0,
            deliveryPrice: 570.6
        }

        const response:Response = await request(app).post("/order")
            .send(order);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that we can save a non-empty order when completed with no errors.
     */
    it('can be saved', async () => {
        let order:Object = {
            userId: 'testest',
            products: {
                id: '744',
                name: 'orderTestP',
                description: 'A product just for the order to have it',
                price: 0.6,
                image: 'no image',
                category: 'testing only',
                numImages: 1
            },
            subTotal: 78.0,
            deliveryPrice: 134.5
        }

        const response:Response = await request(app).post("/order")
            .send(order);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that the added order can be accesed for the user.
     */
    it('can be added', async () => {
        let userId = 'testingUID';
        const response:Response = await request(app).post("/order/find")
            .send(userId);
        // Resultado en formato JSON
        expect(response.type).toEqual("application/json");
        expect(response.statusCode).toBe(200);
    });
});
