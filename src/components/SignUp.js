import React, { Component } from 'react';


class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;
    localStorage.setItem('signUp_email', email);
    localStorage.setItem('signUp_password', password);
    this.props.history.push("/LogIn");
  }

  render() {
    return (
      <div >
        <input id="email" type="text" onChange={this.handleChange}/>
        <br/>
        <input id="password" type="password" onChange={this.handleChange}/>
        <br/>
        <button onClick={this.submit}>Create Account</button>
      </div>
    );
  }

}
export default SignUp;
