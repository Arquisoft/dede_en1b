import { Container, Divider, Stack, Typography } from "@mui/material";
import {
    Text,
    useSession,
    CombinedDataProvider
} from "@inrupt/solid-ui-react";

import { getOrderByUserId } from '../../api/api';

import { useNavigate } from "react-router-dom";

import "../../css/UserProfile.css";

import {
    handleIncomingRedirect,
    onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from 'react';
import OrderCard from "./OrderCard";
import { Order } from "../../shared/shareddtypes";

import AddressForm from "./AddressForm";



import { getSolidDataset, getThing, getStringNoLocale } from "@inrupt/solid-client";

import { VCARD } from "@inrupt/vocab-common-rdf";

import { Address } from "../../shared/shareddtypes";

import {
    getUrlAll,
    Thing
} from "@inrupt/solid-client";

import {
    Session
} from "@inrupt/solid-client-authn-browser";

async function getProfile(webId: string): Promise<Thing> {
    let profileDocumentURI = webId.split("#")[0];
    let myDataset = await getSolidDataset(profileDocumentURI);
    return getThing(myDataset, webId) as Thing;
}

async function getDedExAddress(webId: string, addresses: Address[]) {
    let profileDocumentURI = webId.split("#")[0];
    let myDataset = await getSolidDataset(profileDocumentURI);
    let profile = getThing(myDataset, profileDocumentURI + "#DedExAddress") as Thing;

    let street = getStringNoLocale(profile, VCARD.street_address);
    let city = getStringNoLocale(profile, VCARD.locality);
    let state = getStringNoLocale(profile, VCARD.region);
    let zip = getStringNoLocale(profile, VCARD.postal_code);
    let country = getStringNoLocale(profile, VCARD.country_name);

    addresses.push({
        street: street, city: city, state: state, zip: zip, country: country
    });
}

async function getAddressesFromPod(webId: string) {

    let addressURLs = getUrlAll(await getProfile(webId), VCARD.hasAddress);
    let addresses: Address[] = [];
    await getDedExAddress(webId, addresses);

    for (let addressURL of addressURLs) {
        let profile = await getProfile(addressURL);
        let street = getStringNoLocale(profile, VCARD.street_address);
        let city = getStringNoLocale(profile, VCARD.locality);
        let state = getStringNoLocale(profile, VCARD.region);
        let zip = getStringNoLocale(profile, VCARD.postal_code);
        let country = getStringNoLocale(profile, VCARD.country_name);

        addresses.push({ street: street, city: city, state: state, zip: zip, country: country });
    }

    console.log(addresses);

    return addresses;
}

async function getAddresses(session: Session) {
    const webId = session.info.webId as string;
    getAddressesFromPod(webId).then(data => {
        sessionStorage.setItem("addresses", JSON.stringify(data));
    });
}

export default function UserProfile() {
    const { session } = useSession();
    const webId = session.info.webId as string;
    localStorage.setItem("webId", webId);

    getAddresses(session);

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

    //Order management:
    const [orders, setOrders] = useState<Order[]>([]);
    const findUserOrders = async () => {
        setOrders(await getOrderByUserId(webId));
    }

    useEffect(() => {
        findUserOrders();
    }, []);

    return (
        <Container>
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
                    {/* <Text properties={[
                        "http://www.w3.org/2006/vcard/ns#fn",
                        "http://www.w3.org/2006/vcard/ns#",
                    ]} /> */}
                </Typography>

                <Divider id="mainDivider" orientation="horizontal" flexItem />

                <Typography id="ordersTitle" variant="h4">
                    <span>Your orders: </span>
                </Typography>

                <Stack
                    direction="column"
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={2}
                >

                    {orders.map(order => (
                        <OrderCard order={order} />
                    ))}
                </Stack>
            </CombinedDataProvider>

            <br></br>
            <br></br>
            <hr></hr>

            <AddressForm></AddressForm>
        </Container>
    );
}