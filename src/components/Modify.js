import React, { Component } from 'react';
import * as api from '../services/apiService.js';



class Modify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }

    }

  }

  componentDidMount() {
      const userLocal = JSON.parse(localStorage.getItem('user_local'));
      let user = Object.assign({}, userLocal);

      this.setState({
          user,
      });
    }


    handleChange = (event) => {
       const input = event.target;
       const value = input.value;

       this.setState({ [input.id]: value })
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
export default Modify;
