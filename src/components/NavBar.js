import React, { Component } from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';




class NavBar extends Component {


     render() {
     return (
         <div className="container">
           <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
           </header>
           <Link to="/"> Welcome </Link>
           <br/>
           <Link to="/LogIn"> Log In </Link>
           <br/>
           <Link to="/SignUp"> Sign Up  </Link>
         </div>
        );
    }
}

export default NavBar;
