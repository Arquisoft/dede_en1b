import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    getUrlAll,
    Thing,
    getUrl,
    createThing,
    buildThing,
    setThing,
    saveSolidDatasetAt
  } from "@inrupt/solid-client";
  import {Session} from "@inrupt/solid-client-authn-browser";

  
  import { FOAF, RDF, VCARD } from "@inrupt/vocab-common-rdf";
import { Address } from "../shared/shareddtypes";

    //saves the session in the session storage
    export function setSession(session: Session){
        console.log(session);
        localStorage.setItem("session", JSON.stringify(session));
    }

  //gets the session from the session storage
    export function getSession(): Session|undefined{
        let session = localStorage.getItem("session");
        if(session){
            console.log(JSON.parse(session));
            return JSON.parse(session);
        }
        return undefined;
    }
  
  async function getProfile(webId: string): Promise<Thing> {
    let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
    let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
    return getThing(myDataset, webId) as Thing; // we obtain the thing we are looking for from the dataset
  }

  
  
  
  export async function getNameFromPod(webId: string) {
    return getStringNoLocale(await getProfile(webId), FOAF.name) as string;
  }
  
  export async function getEmailsFromPod(webId: string) {
    let emailURLs = getUrlAll(await getProfile(webId), VCARD.hasEmail);
    let emails: string[] = [];
  
    for (let emailURL of emailURLs) {
      let email = getUrl(await getProfile(emailURL), VCARD.value);
      if (email) emails.push(email.toString().replace("mailto:", "")); // we remove the mailto: part
    }
  
    return emails;
  }
  
  export async function getAddressesFromPod(webId: string) {
    let addressURLs = getUrlAll(await getProfile(webId), VCARD.hasAddress);
    let addresses: Address[] = [];
  
    for (let addressURL of addressURLs) {
        let profile = await getProfile(addressURL);
        console.log(addressURL);
        let street = getStringNoLocale(profile,VCARD.street_address);
        let city = getStringNoLocale(profile,VCARD.locality);
        let state = getStringNoLocale(profile, VCARD.region);
        let zip = getStringNoLocale(profile,VCARD.postal_code);
        let country = getStringNoLocale(profile,VCARD.country_name);
    
        addresses.push({street: street, city: city, state: state, zip: zip, country: country});
    }
  
    return addresses;
  }

  export async function writeAddressToPod(webId: string, address: Address) {
    let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
    let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
    const newAddress = buildThing(createThing({name:"address"}))

    .addStringNoLocale(VCARD.street_address, address.street as string)
    .addStringNoLocale(VCARD.locality, address.city as string)
    .addStringNoLocale(VCARD.region, address.state as string)
    .addStringNoLocale(VCARD.postal_code, address.zip as string)
    .addStringNoLocale(VCARD.country_name, address.country as string)
    .addUrl(RDF.type, "https://schema.org/address")
    .build();

    myDataset = setThing(myDataset,newAddress);

    console.log(getSession()?.fetch);


    const savedSolidDataset = await saveSolidDatasetAt(
        webId,
        myDataset,
        { fetch: getSession()?.fetch }             // fetch from authenticated Session
      );

  }
  