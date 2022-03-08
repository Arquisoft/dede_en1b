
import './App.css';
import { TextField } from '@mui/material';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login  from "./components/Login";
import MainProducts from "./components/MainProducts";


function App(): JSX.Element {

  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainProducts/>} />
          <Route  path="/login" element={<Login/>} />

        </Routes>
    </Router>
    </>
  );
}

export default App;
