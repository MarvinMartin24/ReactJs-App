import React from 'react';
import logo from '../logo.png';



const NavBar = () => {
  return (
    <div className="container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <a href="/"> Accueil </a>
      <br />
      <a href="/LogIn"> Log In </a>
      <br />
      <a href="/SignIn"> Sign In </a>
    </div>
  );
};

export default NavBar;
