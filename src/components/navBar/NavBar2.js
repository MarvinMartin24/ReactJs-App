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
                    <li><Link to="/home"> Home </Link></li>
                    <li><Link to="/modify"> Modify </Link></li>
                    <li><Link to="/transaction"> Transaction </Link></li>
                    <li><Link to="/log-out"> Log Out </Link></li>
                </ul>
            </div>
        );
    }
}

export default NavBar2;
