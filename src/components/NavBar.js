import React, { Component } from 'react';
import logo from '../logo.png';



class NavBar extends Component {


     render() {
     return (
         <div className="container">
           <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
           </header>
           <a href="/"> Accueil </a>
           <br />
           <a href="/LogIn"> Log In </a>
           <br />
           <a href="/SignUp"> Sign Up </a>
         </div>
        );
    }
}

export default NavBar;
