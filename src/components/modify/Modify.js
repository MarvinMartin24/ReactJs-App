import React, { Component } from 'react';
import Card from './Card.js'
import * as api from '../../services/apiService.js';
import './Modify.css';



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
        };
    }

    componentDidMount() {

        this.setState({
            user: api.getUser(this.state.user.id),
            listCard: api.getCards(this.state.user.id),
            newCard: {
                user_id: this.state.user.id,
                id: api.getNewIdCard(),
                last_4:'0000',
                brand:'visa',
                expired_at:'2019-10-28'
            }
        });
    }

    handleChangeUser = (event) => {
        event.preventDefault();

        let formValues = this.state.user;
        let idForm = event.target.name;
        let newValue = event.target.value;
        formValues[idForm] = newValue;

        this.setState({
            formValues
        });

    }

    handleChangeAddCard = (event) => {
        event.preventDefault();

        let formValues = this.state.newCard;
        let idForm = event.target.name;
        let newValue = event.target.value;
        formValues[idForm] = newValue;

        this.setState({
            formValues
        });
    }

    handleChangeCardAddBrand = (event) => {
        event.preventDefault();

        this.setState({
            newCard: {
                user_id: this.state.newCard.user_id,
                id: this.state.newCard.id,
                last_4:this.state.newCard.last_4,
                brand: event.target.value,
                expired_at: this.state.newCard.expired_at
            }
        });
    }

    remove(card) {

        api.removeCard(card.id);
        this.setState({
            listCard: api.getCards(this.state.user.id),
        });
    }

    displayCards = () => {

        if (Array.isArray(this.state.listCard) && (this.state.listCard.length)) {

            let listCard = this.state.listCard.map((card, index) => (
                <div key={index}>
                    <Card
                        card={card}
                    />
                    <button
                        className="modify-button"
                        onClick={() => { this.remove(card); }}
                    > Remove </button>
                </div>
            ));
            return <div className="card-form"> {listCard} </div>;
        }
    }

    submitModifyUser = (event) => {
        event.preventDefault();

        var newUser = this.state.user;
        api.updateUser(newUser);

        this.setState({
            user: api.getUser(this.state.user.id),
        });
    }

    submitAddCard = (event) => {
        event.preventDefault();

        var newCard = this.state.newCard;
        api.addCard(newCard);

        this.setState({
            listCard: api.getCards(this.state.user.id),
        });
    }

    render() {
        return (
            <div className="modify-page">
                <div className="modify-form">
                    <form
                        onSubmit={this.submitModifyUser}>
                        <label>First Name:</label>
                        <input
                            name="first_name"
                            className="modify-input"
                            type="text"
                            value={this.state.user.first_name}
                            onChange={this.handleChangeUser}
                        />
                            <br/>
                        <label>Last Name:</label>
                        <input
                            name="last_name"
                            className="modify-input"
                            type="text"
                            value={this.state.user.last_name}
                            onChange={this.handleChangeUser}
                        />
                            <br/>
                        <label>Email:</label>
                        <input
                            name="email"
                            className="modify-input"
                            type="text"
                            value={this.state.user.email}
                            onChange={this.handleChangeUser}
                        />
                            <br/>
                        <label>Password:</label>
                        <input
                            name="password"
                            className="modify-input"
                            type="password"
                            value={this.state.user.password}
                            onChange={this.handleChangeUser}
                        />
                            <br/>
                        <button className="modify-button">Modify</button>
                    </form>
                </div>
                {this.displayCards()}
                <div className="modify-form">
                    <form onSubmit={this.submitAddCard}>
                        <label>Card Number:</label>
                        <input
                            name="last_4"
                            className="modify-input"
                            type="number"
                            value={this.state.newCard.last_4}
                            onChange={this.handleChangeAddCard}
                        />
                            <br/>
                        <label>Brand:</label>
                        <select className="modify-input" onChange={this.handleChangeCardAddBrand}>
                            <option defaultValue="visa">Visa</option>
                            <option value="master_card">Master Card</option>
                            <option value="american_express">American Expresso</option>
                            <option value="union_pay">Union Pay</option>
                            <option value="jcb">JCB</option>
                        </select>
                            <br/>
                        <label>Expired Date:</label>
                        <input
                            name="expired_at"
                            className="modify-input"
                            type="date"
                            value={this.state.newCard.expired_at}
                            onChange={this.handleChangeAddCard}
                        />
                            <br/>
                        <button className="modify-button"> Add </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Modify;
