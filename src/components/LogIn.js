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



  componentDidMount(){
      const localUser = JSON.parse(localStorage.getItem('user_local'));

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

  login = (event) => {
      event.preventDefault();
    // Verification function
    const response = api.authenticate(this.state.email, this.state.password);


    // Verification sucessed
    if(response.status === "success"){


        const user = response.result;

        localStorage.setItem('user_local', JSON.stringify(user));

        // Spam message
        alert("logged in !");

        localStorage.setItem("view", JSON.stringify("NavBar2"));
        this.props.view();


        // Go to User Profile
        this.props.history.push("/Home");

    }
    // Verification failed
    else{
        // Spam message
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
