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

    submitModifyCard = (event) => {
        event.preventDefault();
        const newCard = this.state;
        api.updateCard(newCard);
    }

    render() {
        return (
            <div className="modify-form">
                <form onSubmit={this.submitModifyCard}>
                    <label> Card Number: </label>
                    <input
                        name="last_4"
                        className="modify-input"
                        type="text"
                        value={this.state.last_4}
                        onChange={this.handleChangeCard}
                    />
                        <br/>
                    <label> Brand: </label>
                    <input
                        name="brand"
                        className="modify-input"
                        type="text"
                        value={this.state.brand}
                        onChange={this.handleChangeCard}
                    />
                        <br/>
                    <label> Expired Date: </label>
                    <input
                        name="expired_at"
                        className="modify-input"
                        type="text"
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
