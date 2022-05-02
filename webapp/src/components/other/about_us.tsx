import DeveloperCards from "./DeveloperCards";

function AboutUs(): JSX.Element {
  
    return (
      <>
          <h1><img style={{width: "40%", marginTop:"40px"}} src="logo.png" alt="logo of the page"></img></h1>

          <h2>Decentralized Delivery</h2>
          <p>DeDe is an online retail system that preserves the privacy of the customers following the SOLID principles. This means that our Decentralized Delivery app will not store user data per se, but will acess, when permission is granted, the information located inside the user's SOLID pod. This information will be used by our app to know the user's address for delivery purposes.</p>

          <br></br>
          <br></br>

          <h2>Developers</h2>
          <br></br>
          <br></br>

          <DeveloperCards></DeveloperCards>

          {/* <ul>
            <li>Jesús González Méndez,     <a href="https://github.com/jesugmend">@jesugmend</a></li>
            <li>Miguel Cuesta Martínez,      <a href="https://github.com/UO258220">@UO258220</a></li>
          </ul> */}
      </>
    );
}
export default AboutUs;