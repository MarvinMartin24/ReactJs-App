import React, { Component } from 'react';


class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signIn_email: '',
      signIn_password: ''
    }

  }


  handleChange = (event) => {
     const input = event.target;
     const value = input.value;

     this.setState({ [input.id]: value })
  }


  submit = () => {
    const { email, password } = this.state;
    localStorage.setItem('signIn_email', email);
    localStorage.setItem('signIn_password', password);
    this.props.history.push("/LogIn");
  }

  render() {
    return (
      <div >
        <input id="email" type="text" onChange={this.handleChange}/>
        <br/>
        <input id="password" type="password" onChange={this.handleChange}/>
        <br/>
        <button onClick={this.submit}>Login</button>
      </div>
    );
  }

}
export default SignIn;
