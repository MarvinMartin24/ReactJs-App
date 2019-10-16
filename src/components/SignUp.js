import React, { Component } from 'react';


class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signUp_firstName: '',
      signUp_lastName: '',
      signUp_email: '',
      signUp_password: ''
    }

  }


  handleChange = (event) => {
     const input = event.target;
     const value = input.value;

     this.setState({ [input.id]: value })
  }


  submit = () => {
    const { firstName, lastName, email, password } = this.state;
    localStorage.setItem('signUp_firstName', firstName);
    localStorage.setItem('signUp_lastName', lastName);
    localStorage.setItem('signUp_email', email);
    localStorage.setItem('signUp_password', password);
    this.props.history.push("/LogIn");
  }

  render() {
    return (
      <div >
      <form >
        <label>First Name:</label>
        <input id="firstName" type="text" onChange={this.handleChange}/>

        <br/>


        <label>Last Name:</label>
        <input id="lastName" type="text" onChange={this.handleChange}/>

        <br/>

        <label>Email:</label>
        <input id="email" type="text" onChange={this.handleChange}/>

        <br/>

        <label>Password:</label>
        <input id="password" type="password" onChange={this.handleChange}/>

        <br/>
        <button onClick={this.submit}>Create Account</button>
      </form>
      </div>
    );
  }

}
export default SignUp;
