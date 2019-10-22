import React, { Component } from 'react';
import Card from "./Card.js"



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
      let listCard =[]
      const userLocal = JSON.parse(localStorage.getItem('user_local'));
      let user = Object.assign({}, userLocal);

      const cardLocal = JSON.parse(localStorage.getItem('cards_local'));
      if (cardLocal){
         listCard = Object.assign([], cardLocal);
      }


      this.setState({
          user,
          listCard,
          newCard: {
              user_id: user.id,
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

    handleChangeCard = (event) => {
        event.preventDefault();

        let formValues = this.state.newCard;
        let idForm = event.target.name;
        let newValue = event.target.value;

        formValues[idForm] = newValue;
        this.setState({formValues})
    }

    remove(index) {

        let listCard = this.state.listCard
        listCard.splice(index, 1)

        localStorage.setItem('cards_local', JSON.stringify(listCard));
        const cardLocal = JSON.parse(localStorage.getItem('cards_local'));
        let newlistCard = Object.assign([], cardLocal);

        this.setState({
            listCard: newlistCard
        });
        window.location.reload();

    }

    displayCards(){
        if (Array.isArray(this.state.listCard) && this.state.listCard.length){
            let listCard = this.state.listCard.map((card, index) =>
              <div key={index}>
                <Card status="remove" card={card}/>
                <button onClick={() => {this.remove(index)}}>Remove</button>
              </div>
            );
            return (<ul>{listCard}</ul>);
        }

   }


   submitModifyUser = () => {
      const signUpUser = this.state.user;
      localStorage.setItem('user_local', JSON.stringify(signUpUser));

    }

    submitAddCard = () => {
        const newCard = this.state.newCard;
        const cardLocal = JSON.parse(localStorage.getItem('cards_local'));

        cardLocal.push(newCard);

        localStorage.setItem('cards_local', JSON.stringify(cardLocal));
     }


  render(){
    console.log(this.state.listCard)
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
                <input name="last_4" type="text"  onChange={this.handleChangeCard}/>

                <br/>


                <label>Brand:</label>
                <input name="brand" type="text"  onChange={this.handleChangeCard}/>

                <br/>

                <label>Expired Date:</label>
                <input name="expired_at" type="text" onChange={this.handleChangeCard}/>
                <br/>

                <button >Add</button>
              </form>
          </ul>
        </div>
    );
  }
}
export default Modify;
