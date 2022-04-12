import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import ProductRoutes from "./routes/product.routes";
import UserRoutes from "./routes/user.routes";
import OrderRoutes from "./routes/order.routes";
import { getSolidDataset, getThing, saveSolidDatasetAt, Thing } from "@inrupt/solid-client";
import { fetchDocument } from 'tripledoc';
import { foaf } from 'rdf-namespaces';

import("./db/db")

const cookieSession = require("cookie-session");

const { 
  getSessionFromStorage,
  getSessionIdFromStorageAll,
  Session
} = require("@inrupt/solid-client-authn-node");



const app: Application = express();
const port: number = 5000;
app.use(
  cookieSession({
    name: "session",
    // These keys are required by cookie-session to sign the cookies.
    keys: [
      "Required, but value not relevant for this demo - key1",
      "Required, but value not relevant for this demo - key2",
    ],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);



var session = require('express-session')


app.use(session({
  secret: 'test test test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

declare module "express-session" {
  interface SessionData {
      sessionId: string;
  }
}

export {};

//set public folder
app.use(express.static(__dirname + '/public'));

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

app.use("/api",ProductRoutes,UserRoutes,OrderRoutes);

app.get("/login", async (req, res, next) => {
  // 1. Create a new Session
  const session = new Session();
  req.session.sessionId = session.info.sessionId;
  const redirectToSolidIdentityProvider = (url:string) => {
    // Since we use Express in this example, we can call `res.redirect` to send the user to the
    // given URL, but the specific method of redirection depend on your app's particular setup.
    // For example, if you are writing a command line app, this might simply display a prompt for
    // the user to visit the given URL in their browser.
    res.redirect(url);
  };
  // 2. Start the login process; redirect handler will handle sending the user to their
  //    Solid Identity Provider.
  await session.login({
    // After login, the Solid Identity Provider will send the user back to the following
    // URL, with the data necessary to complete the authentication process
    // appended as query parameters:
    redirectUrl: `http://localhost:5000/redirect-from-solid-idp`,
    // Set to the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" 
    oidcIssuer: "https://broker.pod.inrupt.com",
    // Pick an application name that will be shown when asked 
    // to approve the application's access to the requested data.
    clientName: "Demo app",
    handleRedirect: redirectToSolidIdentityProvider,
  });
});

app.get("/redirect-from-solid-idp", async (req, res) => {
  // 3. If the user is sent back to the `redirectUrl` provided in step 2,
  //    it means that the login has been initiated and can be completed. In
  //    particular, initiating the login stores the session in storage, 
  //    which means it can be retrieved as follows.
  const session:any = await getSessionFromStorage(req.session.sessionId);

  // 4. With your session back from storage, you are now able to 
  //    complete the login process using the data appended to it as query
  //    parameters in req.url by the Solid Identity Provider:
  await session.handleIncomingRedirect(`http://localhost:${port}${req.url}`);

  // 5. `session` now contains an authenticated Session instance.
  if (session.info.isLoggedIn) {
    return res.send(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
  }
});

// 6. Once you are logged in, you can retrieve the session from storage, 
//    and perform authenticated fetches.
app.get("/fetch", async (req, res, next) => {
  if(typeof req.query["resource"] === "undefined") {
    res.send(
      "<p>Please pass the (encoded) URL of the Resource you want to fetch using `?resource=&lt;resource URL&gt;`.</p>"
    );
  }
  const session = await getSessionFromStorage(req.session.sessionId);
  if(session === undefined) {
    res.send("<p>You are not logged in.</p>");
    return;
  }
  try{
  console.log(session.webId)

  let profileDocumentURI = session.webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  res.send(getThing(myDataset, session.webId) as Thing); // we obtain the thing we are looking for from the dataset

  return;
  
  }catch(e){
    console.log(e);
  }
});

// 7. To log out a session, just retrieve the session from storage, and 
//    call the .logout method.
app.get("/logout", async (req, res, next) => {
  const session = await getSessionFromStorage(req.session.sessionId);
  session.logout();
  res.send(`<p>Logged out.</p>`);
});

// 8. On the server side, you can also list all registered sessions using the
//    getSessionIdFromStorageAll function.
app.get("/", async (req, res, next) => {
  const sessionIds = await getSessionIdFromStorageAll();
  for(const sessionId in sessionIds) {
    // Do something with the session ID...
  }
  res.send(
    `<p>There are currently [${sessionIds.length}] visitors.</p>`
  );
});

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

