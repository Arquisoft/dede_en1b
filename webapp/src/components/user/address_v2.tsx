import { Autocomplete, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Address } from "../../shared/shareddtypes";
import { getShippingCost } from '../../api/api';


function updateShippingCost(index: number, addresses: Address[]) {
    var shippingCost = getShippingCost(addresses[index].country as string, addresses[index].state as string);
    (document.getElementById("cost") as HTMLTextAreaElement).textContent = shippingCost as unknown as string + "€";
}

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
            <div>
                <br></br>
                <br></br>

                <Typography variant="h6">
                    Choose a Shipping Address:
                </Typography>

                <Autocomplete
                    disablePortal
                    id="combo-box-address"
                    options={addresses}
                    sx={{ width: 600 }}
                    renderInput={(params) => <TextField {...params} label="Shipping Address:" />}
                    onChange={(e, value) => {
                        if (value != null) {
                            updateShippingCost(addresses.indexOf(value), adds);
                        } else {
                            window.alert("Please, select an address.");
                        }
                    }}
                />
                <Typography id="costMessage" component="h2" variant="h5" >

                    Your delivery cost is: <span id="cost">{0} €</span>

                </Typography>
            </div>

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
                    <br />
                    Please, head over to your <a href="/profile">Profile</a> to create one or contact us if the problem persists.
                </Typography>
            </div>
        );
    }

};