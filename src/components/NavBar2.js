import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';



class NavBar2 extends Component {

     render() {
     return (
        <div className="container">
          <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
          </header>
           <Link to="/Home"> Home </Link>
           <br/>
           <Link to="Modify"> Modify </Link>
           <br/>
           <Link to="/Transaction"> Transaction </Link>
           <br/>
           <Link to="/LogOut"> Log Out </Link>
        </div>
        );
    }
}

export default NavBar2;
