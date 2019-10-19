import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"


import NavBar from "./components/NavBar.js"
import NavBar2 from "./components/NavBar2.js"

import SignUp from "./components/SignUp.js"
import LogIn from "./components/LogIn.js"
import Profile from "./components/Profile.js"

import Modify from "./components/Modify.js"
import Transaction from "./components/Transaction.js"




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view:'NavBar'
        }
    }


    componentDidMount(){
        const localView = JSON.parse(localStorage.getItem('view'));

        if (localView) {
          this.setState({
            view: localView
          });
        }
      }

      onLoggedIn = () => {
          const localView = JSON.parse(localStorage.getItem('view'));

          if (localView) {
            this.setState({
              view: localView
            });
          }
      }



  render() {

      if (this.state.view === 'NavBar')
      {
          return(
              <BrowserRouter>
                  <NavBar/>
                  <Route exact path="/SignUp" component ={SignUp}/>
                  <Route exact path="/LogIn"  render={(props) => <LogIn {...props} view={this.onLoggedIn} />} />
              </BrowserRouter>
          )
      }

      if (this.state.view === 'NavBar2'){

          return(
              <BrowserRouter>
                <NavBar2/>
                  <Route exact path="/Profile" component ={Profile} />
                  <Route exact path="/Modify" component ={Modify}/>
                  <Route exact path="/Transaction" component ={Transaction}/>
                  <Route exact path="/LogOut" component ={NavBar} />
              </BrowserRouter>
          )
      }

    }
}

export default App;
