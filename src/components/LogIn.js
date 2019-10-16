import React, { Component } from 'react';
import * as api from '../services/apiService.js';



class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem('signIn_email'),
      password: localStorage.getItem('signIn_password')
    }

  }


  handleChange = (event) => {
     const input = event.target;
     const value = input.value;

     this.setState({ [input.id]: value })
  }

  login = () => {
    const response = api.authenticate(this.state.email, this.state.password);
    if(response.status === "success"){
        const user = response.result;
        console.log(user);
        alert("logged in !");
    } else{
        alert(response.error);
    }
  }

  render() {
    return (
      <div >
        <input id="email" type="text" value={this.state.email} onChange={this.handleChange}/>
        <br/>
        <input id="password" type="password" value={this.state.password} onChange={this.handleChange}/>
        <br/>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }

}
export default LogIn;
