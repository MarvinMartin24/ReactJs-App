import React, { Component } from 'react';
import * as api from '../services/apiService.js';




class Modify extends Component {

  constructor(props) {
    super(props);


    this.state = {
      user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    },
    card: {
        user_id: '',
        id:'',
        last_4:'',
        brand:'',
        expired_at:''
    }

    }

  }

  componentDidMount() {
      const userLocal = JSON.parse(localStorage.getItem('user_local'));
      let user = Object.assign({}, userLocal);

      const cardLocal = JSON.parse(localStorage.getItem('cards_local'));
      let card = Object.assign({}, cardLocal);


      this.setState({
          user, card,
      });
    }


    handleChangeUser = (event) => {
        event.preventDefault();

        let formValues = this.state.user;
        let idForm = event.target.id;
        let newValue = event.target.value;

        formValues[idForm] = newValue;
        this.setState({formValues})

    }

    handleChangeCard = (event) => {
        event.preventDefault();

        let formValues = this.state.card;
        let idForm = event.target.id;
        let newValue = event.target.value;

        formValues[idForm] = newValue;
        this.setState({formValues})

    }

    submit = () => {
      const signUpUser = this.state.user;
      localStorage.setItem('user_local', JSON.stringify(signUpUser));

      const card = this.state.card;
      localStorage.setItem('card_local', JSON.stringify(card));
    }


  render() {
    return (
        <div>
          <form onSubmit={this.submit}>
            <label>First Name:</label>
            <input id="first_name" type="text" value={this.state.user.first_name} onChange={this.handleChangeUser}/>

            <br/>


            <label>Last Name:</label>
            <input id="last_name" type="text" value={this.state.user.last_name} onChange={this.handleChangeUser}/>

            <br/>

            <label>Email:</label>
            <input id="email" type="text" value={this.state.user.email} onChange={this.handleChangeUser}/>

            <br/>

            <label>Password:</label>
            <input id="password" type="password" value={this.state.user.password} onChange={this.handleChangeUser}/>

            <br/>
            <button >Modify</button>
          </form>

          <form onSubmit={this.submit}>
            <label>Card Number:</label>
            <input id="last_4" type="text" value={this.state.card.last_4} onChange={this.handleChangeCard}/>

            <br/>


            <label>Brand:</label>
            <input id="brand" type="text" value={this.state.card.brand} onChange={this.handleChangeCard}/>

            <br/>

            <label>Expired Date:</label>
            <input id="expired_at" type="text" value={this.state.card.expired_at} onChange={this.handleChangeCard}/>

            <button >Modify</button>
          </form>
        </div>
    );
  }

}
export default Modify;
