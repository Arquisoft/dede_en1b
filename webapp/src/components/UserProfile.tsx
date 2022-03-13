import { Container, Typography } from "@mui/material";
import {
    Text,
    useSession,
    CombinedDataProvider,
    LogoutButton,
} from "@inrupt/solid-ui-react";

import { useNavigate } from "react-router-dom";

import "../css/UserProfile.css";

import {
    handleIncomingRedirect,
    onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useEffect } from 'react';

export default function UserProfile() {
    const { session } = useSession();
    const webId = session.info.webId as string;

    const navigate = useNavigate();

    onSessionRestore(() => {
        if (session.info.isLoggedIn) {
            navigate("/profile");
        }
    });

    useEffect(() => {
        handleIncomingRedirect({
            restorePreviousSession: true
        }).then(() => {
            if (session.info.isLoggedIn) {
                navigate("/profile");
            }
        })
    }, []);

    return (
        <Container>
            {/* {session.info.isLoggedIn ? ( */}
                <CombinedDataProvider
                    datasetUrl={webId}
                    thingUrl={webId}
                >
                    <Typography id="pageTitle" variant="h3">
                        <span>Welcome, </span>
                        <Text properties={[
                            "http://www.w3.org/2006/vcard/ns#fn",
                            "http://xmlns.com/foaf/0.1/name",
                        ]} />
                    </Typography>
                    {/* <LogoutButton
                        onLogout={() => session.logout()}
                    /> */}
                </CombinedDataProvider>
            {/* ) : (
                <Typography id="pageTitle" variant="h3">
                    Oops! Something went wrong...
                </Typography>
            )} */}
        </Container>
    );
}