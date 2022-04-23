import { useEffect } from "react";
import { Address } from "../../shared/shareddtypes";

const DataComponent = () => {

    let adds: Address[] = [];

    useEffect(() => {
        let addresses = sessionStorage.getItem("addresses");
        
        let addressesJSON = JSON.parse(addresses as string) as JSON;

        console.log(addressesJSON);

        if (addresses != null) {
            for (let address of addressesJSON as unknown as Array<Address>) {
                console.log(address as Address);
                adds.push(address as Address);
            }
        }
    }, [])

    return null;

    // return data
    //     ? (
    //         // <div>
    //         //     <h3>Shipping Address:</h3>
    //         //     <p>Country: {values[0]}</p>
    //         //     <p>Locality: {values[1]}</p>
    //         //     <p>ZIP Code: {values[2]}</p>
    //         //     <p>City: {values[3]}</p>
    //         //     <p>Street: {values[4]}</p>
    //         // </div>
    //         <div>Hay data</div>
    //     )

    //     :
    //     <input type="text"></input>
    //     ;
};


export default function AddressComponent() {
    return DataComponent();
};