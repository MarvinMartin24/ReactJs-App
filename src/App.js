import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"

import NavBar from "./components/NavBar.js"
import SignIn from "./components/SignIn.js"
import LogIn from "./components/LogIn.js"


import UserData from "./database/users.js"


class App extends Component {

  state = {
  };

  verifyUser = user => {

  };



  componentDidMount() {
    console.log("le composant fonctionne")
  }
    //<SignIn verifyUser ={this.verifyUser}/>

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route exact path="/SignIn" component ={SignIn} />
          <Route exact path="/LogIn" component ={LogIn} />
        </div>
      </BrowserRouter>
    );
  }

}
export default App;
