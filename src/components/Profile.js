import React, { Component } from 'react';
import * as api from '../services/apiService.js';



class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        firstName: 'helo',
        lastName: '',
        email: '',
        password: ''
      }

    }

  }

  componentWillMount(){

      this.setState(prevState => {

        const userId = JSON.parse(localStorage.getItem('userId'));
        let user = Object.assign({}, prevState.user);      // creating copy of state variable user
        user = api.getUser(userId);                        // update the name property, assign a new value
        return { user };                                 // return new object user object
      })
    }


    handleChange = (event) => {
       const input = event.target;
       const value = input.value;

       this.setState({ [input.id]: value })
    }


  show(){
    console.log(this.state);
  }

  render() {
    return (
      <div>
      {
        Object.keys(this.state.user).map((key) => {
            return <div>{ this.state.user[key] }</div>
            })
      }

      </div>
    );
  }

}
export default Profile;
