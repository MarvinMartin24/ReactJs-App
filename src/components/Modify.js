import React, { Component } from 'react';
import Card from "./Card.js"
import * as api from '../services/apiService.js';



class Modify extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user_local')),
      listCard: [],
      newCard: {
        user_id: '',
        id:'',
        last_4:'',
        brand:'',
        expired_at:''
    }

    }

  }

  componentDidMount() {

      console.log(this.state.user.id);
      this.setState({
          user: api.getUser(this.state.user.id),
          listCard: api.getCards(this.state.user.id),
          newCard: {
              user_id: this.state.user.id,
              id: Math.floor(Math.random() * 1000),
          }

      });
    }



    handleChangeUser = (event) => {
        event.preventDefault();

        let formValues = this.state.user;
        let idForm = event.target.name;
        let newValue = event.target.value;

        formValues[idForm] = newValue;
        this.setState({formValues})

    }

    handleChangeAddCard = (event) => {
        event.preventDefault();

        let formValues = this.state.newCard;
        let idForm = event.target.name;
        let newValue = event.target.value;

        formValues[idForm] = newValue;
        this.setState({formValues})
    }

    remove(card) {

        api.removeCard(card.id);
        this.setState({
            listCard: api.getCards(this.state.user.id),

        });

    }


    displayCards = () =>{
        if (Array.isArray(this.state.listCard) && this.state.listCard.length){

            let listCard = this.state.listCard.map((card, index) =>
              <div key={index}>
                <Card card={card}/>
                <button onClick={() => {this.remove(card)}}>Remove</button>
              </div>
            );
            return (<ul>{listCard}</ul>);
        }
   }


   submitModifyUser = (event) => {
      event.preventDefault();
      const newUser = this.state.user;
      api.updateUser(newUser);
      this.setState({
          user: api.getUser(this.state.user.id),

      });
    }

    submitAddCard = (event) => {
        event.preventDefault();
        const newCard = this.state.newCard;
        api.addCard(newCard);

        this.setState({
            listCard: api.getCards(this.state.user.id),

        });
     }


  render(){
    return (
        <div>
          <form onSubmit={this.submitModifyUser}>
            <label>First Name:</label>
            <input name="first_name" type="text" value={this.state.user.first_name} onChange={this.handleChangeUser}/>

            <br/>


            <label>Last Name:</label>
            <input name="last_name" type="text" value={this.state.user.last_name} onChange={this.handleChangeUser}/>

            <br/>

            <label>Email:</label>
            <input name="email" type="text" value={this.state.user.email} onChange={this.handleChangeUser}/>

            <br/>

            <label>Password:</label>
            <input name="password" type="password" value={this.state.user.password} onChange={this.handleChangeUser}/>

            <br/>
            <button >Modify</button>
          </form>

            <br/>

          {this.displayCards()}

            <br/>

          <ul>
              <form onSubmit={this.submitAddCard}>
                <label>Card Number:</label>
                <input name="last_4" type="text"  onChange={this.handleChangeAddCard}/>

                <br/>


                <label>Brand:</label>
                <input name="brand" type="text"  onChange={this.handleChangeAddCard}/>

                <br/>

                <label>Expired Date:</label>
                <input name="expired_at" type="text" onChange={this.handleChangeAddCard}/>
                <br/>

                <button >Add</button>
              </form>
          </ul>
        </div>
    );
  }
}
export default Modify;
