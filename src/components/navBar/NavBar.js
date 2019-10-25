import React, { Component } from 'react';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import './NavBar.css';



class NavBar extends Component {

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
                    <li><Link to="/"> Welcome </Link></li>
                    <li><Link to="/LogIn"> Log In </Link></li>
                    <li><Link to="/SignUp"> Sign Up  </Link></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;
