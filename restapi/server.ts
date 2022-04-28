import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import ProductRoutes from "./routes/product.routes";
import UserRoutes from "./routes/user.routes";
import OrderRoutes from "./routes/order.routes";


import("./db/db")

const app: Application = express();
const port: number = 5000;



var session = require('express-session')

app.use(session({
  secret: 'test test test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//set public folder
app.use(express.static(__dirname + '/public'));

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json({limit: '50mb'}));

app.use("/api",ProductRoutes,OrderRoutes);
app.use("/api/admin",UserRoutes);
app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

