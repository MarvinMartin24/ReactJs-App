import React, { Component } from 'react';
import * as api from '../services/apiService.js';
import { existingId, createId } from '../services/api/server.js';



class SignUp extends Component {

    constructor(props) {
    super(props);

    existingId();
    
    this.state = {
      id: createId(),
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }


  handleChange = (event) => {
     const input = event.target;
     const value = input.value;

     this.setState({ [input.id]: value })
  }


  submit = () => {
    const signUpUser = this.state;
    if(api.isEmailAvailable(signUpUser.email)){
        localStorage.setItem('user_local', JSON.stringify(signUpUser));
        alert("Account Created !")
        this.props.history.push("/LogIn");
    }
    else {
        alert("Email Already used !")
        this.props.history.push("/SignUp");
    }

  }

  render() {
    return (
      <div >
      <form onSubmit={this.submit}>
        <label>First Name:</label>
        <input id="first_name" type="text" onChange={this.handleChange}/>

        <br/>


        <label>Last Name:</label>
        <input id="last_name" type="text" onChange={this.handleChange}/>

        <br/>

        <label>Email:</label>
        <input id="email" type="text" onChange={this.handleChange}/>

        <br/>

        <label>Password:</label>
        <input id="password" type="password" onChange={this.handleChange}/>

        <br/>
        <button >Create Account</button>
      </form>
      </div>
    );
  }

}
export default SignUp;
