// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo-crveno.png';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getIdTokenResult } from "firebase/auth";



function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user] = useAuthState(auth);
  
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const logout = async () => {
    await signOut(auth);
  };
  
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const token = await getIdTokenResult(user);
        setIsAdmin(token.claims.admin === true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  return (
    <div className="myNavbar">
      <div className="navbar-brand">
        <Link to="/menu-admin">
            <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleNavbar} aria-label="Toggle menu" aria-expanded={openLinks}>
        <i class="bi bi-justify"></i>
      </button>
      <div className={`navbar-menu ${openLinks ? 'open' : ''}`}>
        <Link to="/" onClick={toggleNavbar}>Почетна</Link>
        {!isAdmin && <Link to="/menu" onClick={toggleNavbar}>Настани</Link>}
        <Link to="/documents" onClick={toggleNavbar}>Документи</Link>
        {!isAdmin && <Link to="/katce" onClick={toggleNavbar}>Јазично катче</Link>}
        <Link to="/register" onClick={toggleNavbar}>Регистар на членови</Link>
        <Link to="/about" onClick={toggleNavbar}>За нас</Link>
        <Link to="/contact" onClick={toggleNavbar}>Контакт</Link>
        {isAdmin && (
            <>
              <Link to="/menu-admin" onClick={toggleNavbar}>Настани</Link>
              <Link to="/katce-admin" onClick={toggleNavbar}>Јазично катче</Link>
              <button onClick={logout} style={{
                background: "transparent",
                border: "none",
                color: "red",
                cursor: "pointer",
                marginLeft: "20px",
              }}>Logout</button>
            </>
          )}

      </div>
    </div>
  );
}

export default Navbar;