import { Container, Divider, Stack, Typography } from "@mui/material";

import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    getUrlAll,
    Thing,
    getUrl,
  } from "@inrupt/solid-client";
  
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
import { getAddressesFromPod, setSession } from "../../api/solid";
import {Session} from "@inrupt/solid-client-authn-browser";

type ProfileProps = {
    setSessionInfo: (sessionInfo:Session) => void,
}

export default function UserProfile(props: ProfileProps) {

    const { session } = useSession();
    const webId = session.info.webId as string;
    localStorage.setItem("webId", webId);
    let username : string = "null";

    const navigate = useNavigate();

    onSessionRestore(() => {
        if (session.info.isLoggedIn) {
            
            navigate("/profile");
        }
    });

    useEffect(() => {
        handleIncomingRedirect({
            restorePreviousSession: true
        }).then(async () => {
            if (session.info.isLoggedIn) {
                setSession(session);
            }
                navigate("/profile");
            })
            

        }, []);

    // let address : string = "Address not found."
    // if (localStorage.getItem("provider") == "https://inrupt.net/")  {
    //     username = webId.substring(8, webId.length - 27);

    //     axios.get("https://" + username + ".solidcommunity.net/profile/card#address")
    //     .then(res => {
    //         console.log(res.data);
    //         address = res.data;
    //     })
    // } else if (localStorage.getItem("provider") == "https://broker.pod.inrupt.com/") {
    //     username = webId.substring(8, webId.length - 27);
        
    //     axios.get("https://" + username + ".solidcommunity.net/profile/card#address")
    //     .then(res => {
    //         console.log(res.data);
    //         address = res.data;
    // })
    // }  

    console.log(username);

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
        </Container>
    );
}
