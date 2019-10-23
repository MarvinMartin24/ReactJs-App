import React, { Component } from 'react';
import * as api from '../services/apiService.js';


class Card extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user_id: this.props.card.user_id,
          id:this.props.card.id,
          last_4:this.props.card.last_4,
          brand:this.props.card.brand,
          expired_at:this.props.card.expired_at
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card !== this.props.card) {

      this.setState({
          user_id: nextProps.card.user_id,
          id: nextProps.card.id,
          last_4: nextProps.card.last_4,
          brand: nextProps.card.brand,
          expired_at: nextProps.card.expired_at
          });
    }
  }

  handleChangeCard = (event) => {
      event.preventDefault();
      const input = event.target;
      const value = input.value;

      this.setState({ [input.name]: value })
  }

  submitModifyCard = (event) => {
      event.preventDefault();
      const newCard = this.state;
      api.updateCard(newCard)
   }

  render() {
      return (
          <form onSubmit={this.submitModifyCard}>
            <label>Card Number:</label>
            <input name="last_4" type="text" value={this.state.last_4} onChange={this.handleChangeCard}/>

            <br/>


            <label>Brand:</label>
            <input name="brand" type="text" value={this.state.brand} onChange={this.handleChangeCard}/>

            <br/>

            <label>Expired Date:</label>
            <input name="expired_at" type="text" value={this.state.expired_at} onChange={this.handleChangeCard}/>
            <br/>

            <button > Modify </button>
          </form>
      )
  }
}

export default Card;
