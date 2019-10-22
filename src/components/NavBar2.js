import React, { Component } from 'react';
import logo from '../logo.png';



class NavBar2 extends Component {
    
     render() {
     return (
        <div className="container">
          <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
          </header>
          <a href="/Home"> Home </a>
          <br />
          <a href="/Modify"> Modify </a>
          <br />
          <a href="/Transaction"> Transaction </a>
          <br />
          <a href="/LogOut"> Log Out </a>
        </div>
        );
    }
}

export default NavBar2;
