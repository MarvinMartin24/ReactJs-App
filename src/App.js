import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import './App.css';


import NavBar from "./components/navBar/NavBar.js"
import NavBar2 from "./components/navBar/NavBar2.js"

import SignUp from "./components/signUp/SignUp.js"
import LogIn from "./components/logIn/LogIn.js"

import Modify from "./components/modify/Modify.js"
import Transaction from "./components/transactions/Transaction.js"
import LogOut from "./components/logIn/LogOut.js"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view:'NavBar'
        }
    }


    componentDidMount() {
        const localView = JSON.parse(localStorage.getItem('view'));

        if (localView) {
          this.setState({
            view: localView
          });
        }
      }

      onChangeView = () => {
          const localView = JSON.parse(localStorage.getItem('view'));

          if (localView) {
            this.setState({
              view: localView
            });
          }
      }


    render() {
        if (this.state.view === 'NavBar') {
            return(
                <div className="root-container">
                    <BrowserRouter>
                        <NavBar />
                        <Route exact path="/SignUp" component ={SignUp} />
                        <Route exact path="/LogIn"  render={(props) => <LogIn {...props} view={this.onChangeView} />} />
                    </BrowserRouter>
                </div>
            );
        }
        if (this.state.view === 'NavBar2') {
            return(
                <div className="root-container">
                    <BrowserRouter>
                        <NavBar2 />
                        <Route exact path="/Modify" component ={Modify} />
                        <Route exact path="/Transaction" component ={Transaction} />
                        <Route exact path="/LogOut" render={(props) => <LogOut {...props} view={this.onChangeView} />} />
                    </BrowserRouter>
                </div>
            );
        }
    }
}

export default App;
