import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import { useSession } from "@inrupt/solid-ui-react";

import { Store } from 'react-notifications-component';

import {
    getSolidDataset,
    createThing,
    buildThing,
    setThing,
    saveSolidDatasetAt
} from "@inrupt/solid-client";

import { RDF, VCARD } from "@inrupt/vocab-common-rdf";

import "../../css/AddressForm.css"

import { Address } from "../../shared/shareddtypes"

import { SessionInfo } from '@inrupt/solid-ui-react/dist/src/hooks/useSession';

let session: SessionInfo;

function addAddress() {
    let street = (document.getElementById("Street") as HTMLInputElement).value;
    let city = (document.getElementById("City") as HTMLInputElement).value;
    let locality = (document.getElementById("Locality") as HTMLInputElement).value;
    let zipcode = (document.getElementById("ZIPCode") as HTMLInputElement).value;
    let country = (document.getElementById("Country") as HTMLInputElement).value;

    let address: Address = {
        street: street, city: city, state: locality, zip: zipcode, country: country
    }

    let flag: boolean = true;

    if (street.length === 0) {
        flag = false;
    }
    if (city.length === 0) {
        flag = false;
    }
    if (locality.length === 0) {
        flag = false;
    }
    if (zipcode.length === 0) {
        flag = false;
    }
    if (country.length === 0) {
        flag = false;
    }


    if (!flag) {
        Store.addNotification({
            title: "Attention!",
            message: "Please, fill all form fields.",
            type: "danger",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
    } else {
        persistAddress(address);
    }
}

async function writeAddressToPod(webId: string, address: Address) {
    let profileDocumentURI = webId.split("#")[0];
    let myDataset = await getSolidDataset(profileDocumentURI);
    const newAddress = buildThing(createThing({ name: "DedExAddress" }))

        .addStringNoLocale(VCARD.street_address, address.street as string)
        .addStringNoLocale(VCARD.locality, address.city as string)
        .addStringNoLocale(VCARD.region, address.state as string)
        .addStringNoLocale(VCARD.postal_code, address.zip as string)
        .addStringNoLocale(VCARD.country_name, address.country as string)
        .addUrl(RDF.type, "https://schema.org/address")
        .build();

    myDataset = setThing(myDataset, newAddress);

    const savedSolidDataset = await saveSolidDatasetAt(
        webId,
        myDataset,
        { fetch: session.fetch }
    );

    console.log("SAVED? :", savedSolidDataset);
}

async function persistAddress(address: Address) {
    console.log("PERSISTING ADDRESS:", address);
    await writeAddressToPod(session.session.info.webId as string, address);
    window.location.reload();
}

export default function AddressForm() {
    session = useSession();
    return (
        <div>
            <Typography id="addressTitle" variant='h4'>Create / Update DedEx Address</Typography>
            <br></br>
            <form id="myform">
                <TextField sx={{ width: 500 }} label="Street" id="Street" aria-describedby="Street-helper-text" required={true} />
                <FormHelperText id="Street-helper-text">Example: Valdés Salas.</FormHelperText>
                <br></br>
                <TextField sx={{ width: 500 }} label="City" id="City" aria-describedby="City-helper-text" required={true} />
                <FormHelperText id="City-helper-text">Example: Oviedo.</FormHelperText>
                <br></br>
                <TextField sx={{ width: 500 }} label="Locality" id="Locality" aria-describedby="Locality-helper-text" required={true} />
                <FormHelperText id="Locality-helper-text">Example: Asturias.</FormHelperText>
                <br></br>
                <TextField sx={{ width: 500 }} label="ZIP Code" id="ZIPCode" aria-describedby="ZIPCode-helper-text" required={true} />
                <FormHelperText id="ZIPCode-helper-text">Example: 33007.</FormHelperText>
                <br></br>
                <TextField sx={{ width: 500 }} label="Country" id="Country" aria-describedby="Country-helper-text" required={true} />
                <FormHelperText id="Country-helper-text">Example: Spain.</FormHelperText>

                <Button type="button" onClick={addAddress} id="addAddress" variant="contained">Set Address</Button>
            </form>
            <br></br>
            <br></br>
        </div>
    );
}