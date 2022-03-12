import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import ProductList from './components/ProductList';
import Header from './components/NavBar';
import Footer from './components/Footer';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from "./components/about_us"
import SOLIDLogin from "./components/SOLIDLogin";
import UserProfile from "./components/UserProfile";

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);

  const refreshUserList = async () => {
    setProducts(await getProducts());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>


      <Header />
        <Container style={{alignContent: "center", marginTop: "5%", minHeight: "50vh"}} maxWidth="lg">
        <Router>
          <Routes>
              <Route path='/' element={<ProductList products={products}/>} />
              <Route path='/about_us' element={<AboutUs/>} />
              <Route path='/cart' element={<ProductList products={products}/>} />
              <Route path='/login' element={<SOLIDLogin/>} />
              <Route path='/profile' element={<UserProfile/>} />
          </Routes>
          </Router>
        </Container>
      <Footer/>

      
    </>
  );
}

export default App;
