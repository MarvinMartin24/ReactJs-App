import React, { Component } from 'react';
import * as api from '../services/apiService.js';


class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }


  }

  componentWillMount(){
      const localUser = JSON.parse(localStorage.getItem('signUpUser'));
      if (localUser) {
        this.setState({
          email: localUser.email,
          password: localUser.password
        });
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
        this.props.history.push("/");

    } else{
        alert(response.error);
    }
  }

  render() {
    return (
      <div >
      <form onSubmit={this.login}>
        <label>Email:</label>
        <input id="email" type="text" value={this.state.email} onChange={this.handleChange}/>
        <br/>
        <label>Password:</label>
        <input id="password" type="password" value={this.state.password} onChange={this.handleChange}/>
        <br/>
        <button >Login</button>
      </form>
      </div>
    );
  }

}
export default LogIn;
