import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import './NavBar.css';



class NavBar2 extends Component {
    render() {

        return (
            <div className="container">
                <header className="App-header">
                    <img
                        src={logo}
                        className="App-logo"
                        alt="logo"
                    />
                </header>
                <ul>
                    <li><Link to="/Home"> Home </Link></li>
                    <li><Link to="Modify"> Modify </Link></li>
                    <li><Link to="/Transaction"> Transaction </Link></li>
                    <li><Link to="/LogOut"> Log Out </Link></li>
                </ul>
            </div>
        );
    }
}

export default NavBar2;
