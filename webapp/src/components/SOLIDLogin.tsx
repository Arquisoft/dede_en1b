import { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Autocomplete, Button, Container, Grid, TextField, Typography } from "@mui/material";
import "../css/SOLIDLogin.css";

const authOptions = {
  clientName: "DedEx: Decentralized Delivery",
};

export default function SOLIDLogin() {
  const [oidcIssuer, setOidcIssuer] = useState("https://broker.pod.inrupt.com/");

  const providers = [{displayName: "Broker Inrupt", url: "https://broker.pod.inrupt.com/"}, {displayName: "Inrupt", url: "https://inrupt.net/"}]

  return (
    <Container id="mainLoginDiv">
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
            if (value != null)
            setOidcIssuer(value.url)}}
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
    </Container>
  );
}