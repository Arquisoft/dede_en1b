import { Autocomplete, TextField, Typography } from "@mui/material";
import { Address } from "../../shared/shareddtypes";
import { getShippingCost } from '../../api/api';


function updateShippingCost(index: number, addresses: Address[]) {
    var shippingCost = getShippingCost(addresses[index].country as string, addresses[index].state as string);
    (document.getElementById("cost") as HTMLTextAreaElement).textContent = "Your delivery cost is: "  + shippingCost as unknown as string + " €";
    if(shippingCost==0){
        (document.getElementById("message") as HTMLTextAreaElement).textContent = "Delivery is free as your pruchase is worth more than 100€"
    }else if(shippingCost==30){
        (document.getElementById("message") as HTMLTextAreaElement).textContent = "Shipping outside the country."
    }else if(shippingCost == 3.99){
        (document.getElementById("message") as HTMLTextAreaElement).textContent = "Address is in the peninsula."
    }else{
        (document.getElementById("message") as HTMLTextAreaElement).textContent = "Address is not in the peninsula."
    }
    localStorage.setItem("selectedAddress", JSON.stringify(addresses[index]));
}

function setAddress(index: number, addresses: Address[]) {
    localStorage.setItem("selectedAddress", JSON.stringify(addresses[index]));
}

export default function AddressComponent() {

    let adds: Address[] = [];

    let addresses = sessionStorage.getItem("addresses");

    let addressesJSON = JSON.parse(addresses as string) as JSON;

    if (addresses != null) {
        for (let address of addressesJSON as unknown as Array<Address>) {
            adds.push(address);
        }
    }

    if (adds.length > 0) {

        const addressesString = adds.map(item => item.street + ", " + item.zip + ", " + item.state + ", " + item.country);

        setAddress(0, adds);

        return (
            <div>
                <br></br>
                <br></br>

                <Typography variant="h6">
                    Choose a Shipping Address:
                </Typography>

                <Autocomplete
                    disablePortal
                    id="combo-box-address"
                    options={addressesString}
                    defaultValue={addressesString[0] as string}
                    sx={{ width: '80%', marginTop:'1%' }}
                    renderInput={(params) => <TextField {...params} label="Shipping Address:" />}
                    onChange={(_e, value) => {
                        if (value != null) {
                            updateShippingCost(addressesString.indexOf(value), adds);
                        }else{
                            (document.getElementById("cost") as HTMLTextAreaElement).textContent = "";
                        }
                    }}
                />
                
                <Typography id="costMessage" component="h2" variant="h5" >

                    <span id="cost"></span>
                    <Typography id="message" component="p" ></Typography>                    
                </Typography>
                
                
            </div>

        );
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

}