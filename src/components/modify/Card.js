import React, { Component } from 'react';
import * as api from '../../services/apiService.js';
import './Modify.css';



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
        var input = event.target;
        var value = input.value;

        this.setState({
            [input.name]: value
        });
    }

    handleChangeCardBrand = (event) => {
        event.preventDefault();

        this.setState({
            brand: event.target.value
        });
    }

    getlength = (number) => {
        return number.toString().length;
    }

    submitModifyCard = (event) => {
        event.preventDefault();

        const newCard = this.state;

        if (this.getlength(newCard.last_4) === 4){
            api.updateCard(newCard);
            alert('Card Modified');

        }
        else {
            alert('The card number must be composed of 4 digits');
        }


    }

    render() {
        return (
            <div className="modify-form">
                <form onSubmit={this.submitModifyCard}>
                    <label> Card Number: </label>
                    <input
                        name="last_4"
                        className="modify-input"
                        type="number"
                        value={this.state.last_4}
                        onChange={this.handleChangeCard}
                    />
                        <br/>
                    <label> Brand: </label>
                    <select value={this.state.brand} className="modify-input" onChange={this.handleChangeCardBrand}>
                        <option value="visa">Visa</option>
                        <option value="master_card">Master Card</option>
                        <option value="american_express">American Express</option>
                        <option value="union_pay">Union Pay</option>
                        <option value="jcb">JCB</option>
                    </select>
                        <br/>
                    <label> Expired Date: </label>
                    <input
                        name="expired_at"
                        className="modify-input"
                        type="date"
                        value={this.state.expired_at}
                        onChange={this.handleChangeCard}
                    />
                        <br/>
                    <button className="modify-button"> Modify </button>
              </form>
            </div>
        );
    }
}

export default Card;
