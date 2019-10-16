import React, { Component } from 'react';


class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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
    localStorage.setItem('signUpUser', JSON.stringify(signUpUser));
    this.props.history.push("/LogIn");
  }

  render() {
    return (
      <div >
      <form onSubmit={this.submit}>
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
        <button >Create Account</button>
      </form>
      </div>
    );
  }

}
export default SignUp;
