import { Request, Response } from 'express';

const express = require("express");
const cookieSession = require("cookie-session");

const { 
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
  
const app = express();
const port = 3000;

  // The following snippet ensures that the server identifies each user's session
// with a cookie using an express-specific mechanism
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

class SOLIDController {

    public async login(req: Request, res: Response) {
        // 1. Create a new Session
        const session = new Session();
        req.session.sessionId = session.info.sessionId;
        const redirectToSolidIdentityProvider = (url: string) => {
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
        redirectUrl: `http://localhost:${port}/redirect-from-solid-idp`,
        // Set to the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" 
        oidcIssuer: "https://broker.pod.inrupt.com",
        // Pick an application name that will be shown when asked 
        // to approve the application's access to the requested data.
        clientName: "DedEx",
        handleRedirect: redirectToSolidIdentityProvider,
        });
    }

    public async redirect(req: Request, res: Response) {
        // 3. If the user is sent back to the `redirectUrl` provided in step 2,
        //    it means that the login has been initiated and can be completed. In
        //    particular, initiating the login stores the session in storage, 
        //    which means it can be retrieved as follows.
        const session = await getSessionFromStorage(req.session.sessionId);
        
        // 4. With your session back from storage, you are now able to 
        //    complete the login process using the data appended to it as query
        //    parameters in req.url by the Solid Identity Provider:
        await session.handleIncomingRedirect(`http://localhost:${port}${req.url}`);
        
        // 5. `session` now contains an authenticated Session instance.
        if (session.info.isLoggedIn) {
            return res.send(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
        }
    }

    public async fetch(req: Request, res: Response) {
    // 6. Once you are logged in, you can retrieve the session from storage, 
    //    and perform authenticated fetches.
    if(typeof req.query["resource"] === "undefined") {
      res.send(
        "<p>Please pass the (encoded) URL of the Resource you want to fetch using `?resource=&lt;resource URL&gt;`.</p>"
      );
    }
    const session = await getSessionFromStorage(req.session.sessionId);
    console.log(await (await session.fetch(req.query["resource"])).text());
    res.send("<p>Performed authenticated fetch.</p>");
    }

    public async logout(req: Request, res: Response) {
        // 7. To log out a session, just retrieve the session from storage, and 
        //    call the .logout method.
        const session = await getSessionFromStorage(req.session.sessionId);
        session.logout();
        res.send(`<p>Logged out.</p>`);
    }
}

export default new SOLIDController();