import { useEffect, useState } from "react";

const DataComponent = () => {
    const [data, setData] = useState(null);
    const webId = localStorage.getItem("webId") as string;
    let username: string = "null";
    let url: string = "null";
    let values: string[] = [];

    useEffect(() => {
        let unmounted = false;

        if (localStorage.getItem("provider") == "https://inrupt.net/") {
            username = webId.substring(8, webId.length - 27);
        } else if (localStorage.getItem("provider") == "https://broker.pod.inrupt.com/") {
            username = webId.substring(23, webId.length - 16);            
        }

        url = "https://pod.inrupt.com/" + username + "/public/address.json";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                !unmounted && setData(data);
            })
            .catch(console.error);


        return () => {
            (unmounted = true)
        };
    }, [])

    if (data) {
        for (let line of JSON.stringify(data).split(',')) {
            let value: string = line.split(':')[1].replace('"', '').replace('"', '').replace('}', '');
            values.push(value);
        }
    }

    return data
        ? (
            <div>
                <h3>Shipping Address:</h3>
                <p>Country: {values[0]}</p>
                <p>Locality: {values[1]}</p>
                <p>ZIP Code: {values[2]}</p>
                <p>City: {values[3]}</p>
                <p>Street: {values[4]}</p>
            </div>
        )

        :
        <div>
            <h3>Shipping Address:</h3>
            <p>Loading...</p>
        </div>
        ;
};


export default function AddressComponent() {
    return DataComponent();
};