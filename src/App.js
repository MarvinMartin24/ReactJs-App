import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"

import NavBar from "./components/NavBar.js"
import SignUp from "./components/SignUp.js"
import LogIn from "./components/LogIn.js"
import Profile from "./components/Profile.js"


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/LogIn" component ={LogIn} />
          <Route exact path="/Profile" component ={Profile} />
        </div>
      </BrowserRouter>
    );
  }

}
export default App;
