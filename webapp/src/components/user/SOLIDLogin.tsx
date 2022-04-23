import { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { Autocomplete, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSolidDataset, getThing, getStringNoLocale } from "@inrupt/solid-client";

import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";

import { Address } from "../../shared/shareddtypes";

import {
  getUrlAll,
  Thing,
  getUrl,
  createThing,
  buildThing,
  setThing,
  saveSolidDatasetAt
} from "@inrupt/solid-client";

import "../../css/SOLIDLogin.css";

import {
  handleIncomingRedirect,
  onSessionRestore,
  fetch,
  Session
} from "@inrupt/solid-client-authn-browser";
import { useEffect } from 'react';

const authOptions = {
  clientName: "DedEx: Decentralized Delivery",
};

function handleProvider(value: { displayName: string; url: string; } | null) {
  localStorage.setItem("provider", value?.url as string);
}

async function getProfile(webId: string): Promise<Thing> {
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return getThing(myDataset, webId) as Thing; // we obtain the thing we are looking for from the dataset
}

export async function getAddressesFromPod(webId: string) {
  let addressURLs = getUrlAll(await getProfile(webId), VCARD.hasAddress);
  let addresses: Address[] = [];

  for (let addressURL of addressURLs) {
      let profile = await getProfile(addressURL);
      let street = getStringNoLocale(profile,VCARD.street_address);
      let city = getStringNoLocale(profile,VCARD.locality);
      let state = getStringNoLocale(profile, VCARD.region);
      let zip = getStringNoLocale(profile,VCARD.postal_code);
      let country = getStringNoLocale(profile,VCARD.country_name);
  
      addresses.push({street: street, city: city, state: state, zip: zip, country: country});
  }

  return addresses;
}

async function getAddresses(session: Session) {
  const webId = session.info.webId as string;
  getAddressesFromPod(webId).then(data => {
    sessionStorage.setItem("addresses", JSON.stringify(data));
  });
}

export default function SOLIDLogin() {

  const navigate = useNavigate();

  const [oidcIssuer, setOidcIssuer] = useState("https://broker.pod.inrupt.com/");

  const providers = [{ displayName: "Broker Inrupt", url: "https://broker.pod.inrupt.com/" }, { displayName: "Inrupt", url: "https://inrupt.net/" }, { displayName: "SOLID Community", url: "https://solidcommunity.net/" }]

  const { session } = useSession();

  useEffect(() => {
    handleIncomingRedirect({
      restorePreviousSession: true
    }).then(() => {
      if (session.info.isLoggedIn) {
        getAddresses(session);
        navigate("/profile");
      }
    })
  }, []);

  return (
    <Container id="mainLoginDiv">
      <>
        <Typography id="pageTitle" variant="h3">
          SOLID Login
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-providers"
          options={providers}
          renderInput={(params) => <TextField {...params} label="Provider:" />}
          getOptionLabel={(option) => option.displayName}
          onChange={(e, value) => {
            if (value != null) {
              setOidcIssuer(value.url)
            }
            handleProvider(value);
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button href="/" variant="contained" id="cancelButton" >Cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <LoginButton
              oidcIssuer={oidcIssuer}
              redirectUrl={window.location.href}
              authOptions={authOptions}>
              <Button id="loginButton" data-testid="button" color="primary" variant="contained">CONNECT</Button>
            </LoginButton>
          </Grid>
        </Grid>
        <Typography variant="body1" component="p" className="help">
          Don't have a POD? Get one here: <Link id="inrupt" href="https://inrupt.com/" target="_blank">Inrupt</Link>
        </Typography>
      </>
    </Container>
  );
}