import { Autocomplete, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Address } from "../../shared/shareddtypes";

export default function AddressComponent() {

    let adds: Address[] = [];

    let addresses = sessionStorage.getItem("addresses");

    let addressesJSON = JSON.parse(addresses as string) as JSON;

    if (addresses != null) {
        for (let address of addressesJSON as unknown as Array<Address>) {
            adds.push(address as Address);
        }
    }

    if (adds.length > 0) {

        const addresses = adds.map(item => item.street + ", " + item.zip + ", " + item.state + ", " + item.country);

        const AddressComboBox = (
            <Autocomplete
                disablePortal
                id="combo-box-address"
                options={addresses}
                sx={{ width: 600 }}
                renderInput={(params) => <TextField {...params} label="Shipping Address:" />}
            />
        );

        return AddressComboBox;
    } else {
        return (
            <div>
                <Typography variant="h3">
                    Oops! Something went wrong.
                </Typography>
                <Typography variant="h6">
                    We either could not find your address, or none are publicly available on your POD.
                    <br/>
                    Please, head over to your <a href="/profile">Profile</a> to create one or contact us if the problem persists.
                </Typography>
            </div>
        );
    }

    return <div>Loading...</div>


};