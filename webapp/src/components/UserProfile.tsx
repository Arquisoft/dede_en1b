import { Container, Divider, Stack, Typography } from "@mui/material";
import {
    Text,
    useSession,
    CombinedDataProvider
} from "@inrupt/solid-ui-react";

import { getOrderByUserId } from '../api/api';

import { useNavigate } from "react-router-dom";

import "../css/UserProfile.css";

import {
    handleIncomingRedirect,
    onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from 'react';
import OrderCard from "./OrderCard";
import { Order } from "../shared/shareddtypes";


export default function UserProfile() {
    const { session } = useSession();
    const webId = session.info.webId as string;

    //Order management:
    const [orders, setOrders] = useState<Order[]>([]);
    const findUserOrders = async () => {
        setOrders(await getOrderByUserId(webId.substring(23, webId.length).slice(0, -16)));
    }

    useEffect(() => {
        findUserOrders();
    }, []);

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
                        <OrderCard order = {order}/>
                    ))}
                </Stack>


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