import { useState } from 'react'
import './App.css'
import './index.css';
import Navbar from './components/Nnavbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import MenuAdmin from './pages/MenuAdmin';
import Documents from './pages/Documents';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import EventDetails from "./pages/EventDetails";
import JazicnoKatce from "./pages/Katce";
import JazicnoKatceAdmin from "./pages/KatceAdmin";


function App() {
  return (
    <div className='app-container'>
        <Navbar/>
        <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/menu-admin' element={<ProtectedRoute> <MenuAdmin/> </ProtectedRoute>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/documents' element={<Documents/>}/>
        <Route path='/register' element={<Register/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/event/:id' element={<EventDetails/>}/>
        <Route path='/katce' element={<JazicnoKatce/>}/>
        <Route path='/katce-admin' element={<ProtectedRoute><JazicnoKatceAdmin/></ProtectedRoute>}/>


        </Routes>
        <Footer/>
    </div>
   
  );
}

export default App;
