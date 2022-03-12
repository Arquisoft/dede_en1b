import { Container, Typography } from "@mui/material";
import {
    Text,
    useSession,
    CombinedDataProvider,
} from "@inrupt/solid-ui-react";

import { useNavigate } from "react-router-dom";

import "../css/UserProfile.css"

export default function UserProfile() {
    const { session } = useSession();
    const webId = session.info.webId as string;

    const navigate = useNavigate();

    if (!session.info.isLoggedIn) {
        navigate("/login");
    }

    return (
        <Container>
            {session.info.isLoggedIn ? (
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

                </CombinedDataProvider>
            ) : (
                <Typography id="pageTitle" variant="h3">
                    Oops! Something went wrong...
                </Typography>
            )}
        </Container>
    );
}