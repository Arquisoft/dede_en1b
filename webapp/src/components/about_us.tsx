function AboutUs(): JSX.Element {
  
    return (
      <>
          <h1><img style={{width: "40%"}} src="logo.png" alt="logo of the page"></img></h1>

          <h2>Decentralized Delivery</h2>
          <p>DeDe is an online retail system that preserves the privacy of the customers following the SOLID principles. This means that our Decentralized Delivery app will not store user data per se, but will acess, when permission is granted, the information located inside the user's SOLID pod. This information will be used by our app to know the user’s address for delivery purposes.</p>

          <h2>Developers</h2>
          <ul>
            <li>Sebastián López Hernández, <a href="https://github.com/sebaslh01">@sebaslh01</a></li>
            <li>Daniel Álvarez Díaz,     <a href="https://github.com/danieladov">@danieladov</a></li>
            <li>Luis Miguel Alonso Ferreiro  <a href="https://github.com/lumialfe">@lumialfe</a></li>
            <li>Jesús González Méndez,     <a href="https://github.com/jesugmend">@jesugmend</a></li>
            <li>Miguel Cuesta Martínez,      <a href="https://github.com/UO258220">@UO258220</a></li>
          </ul>
      </>
    );
}
export default AboutUs;