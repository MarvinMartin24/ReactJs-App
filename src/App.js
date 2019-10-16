import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"

import NavBar from "./components/NavBar.js"
import SignUp from "./components/SignUp.js"
import LogIn from "./components/LogIn.js"


class App extends Component {

  state = {
  };

  verifyUser = user => {

  };



  componentDidMount() {
    console.log("le composant fonctionne")
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/LogIn" component ={LogIn} />
        </div>
      </BrowserRouter>
    );
  }

}
export default App;
