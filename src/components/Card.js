import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
      super(props);
      this.state = {
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

          this.setState({
              card: this.props.card,
          })
  }

  handleChangeCard = (event) => {
      event.preventDefault();

      let formValues = this.state.card;
      let idForm = event.target.name;
      let newValue = event.target.value;

      formValues[idForm] = newValue;
      this.setState({formValues})
  }

   getIndexCard = () => {
      const cardLocal = JSON.parse(localStorage.getItem('cards_local'));
      let index = cardLocal.findIndex(card => card.id == this.state.card.id);
      return index;
  }

  submitModifyCard = () => {
      const newCard = this.state.card;
      const cardLocal = JSON.parse(localStorage.getItem('cards_local'));

      let index = this.getIndexCard();
      cardLocal[index] = newCard;

      localStorage.setItem('cards_local', JSON.stringify(cardLocal));
   }

  render() {
      return (
          <form onSubmit={this.submitModifyCard}>
            <label>Card Number:</label>
            <input name="last_4" type="text" value={this.state.card.last_4} onChange={this.handleChangeCard}/>

            <br/>


            <label>Brand:</label>
            <input name="brand" type="text" value={this.state.card.brand} onChange={this.handleChangeCard}/>

            <br/>

            <label>Expired Date:</label>
            <input name="expired_at" type="text" value={this.state.card.expired_at} onChange={this.handleChangeCard}/>
            <br/>

            <button > Modify </button>
          </form>
      )
  }
}

export default Card;
