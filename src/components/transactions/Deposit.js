import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import * as api from '../../services/apiService.js';
import './Deposit.css';



class Deposit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user_local')),
            listCard: api.getCards(JSON.parse(localStorage.getItem('user_local')).id),
            selectedCard: api.getCards(JSON.parse(localStorage.getItem('user_local')).id)[0],
            listPayIns: api.getPayIns(this.props.wallet.id),
            payIn: {
                id: api.getNewIdPayIn(),
                wallet_id:'',
                amount:''
            }
        };
    }

    componentDidMount() {

        this.setState({
            selectedCard: this.state.listCard[0],
            listCard: api.getCards(this.state.user.id),
        });
    }

    handleChangeAmount = (event) => {
        event.preventDefault();

        this.setState({
            payIn: {
                id: this.state.payIn.id,
                wallet_id:this.props.wallet.id,
                amount: parseInt(event.target.value)*100,
            }
        });
    }

    handleSelectCard = (event) => {
        event.preventDefault();

        var selectedIndex = event.target.options.selectedIndex;

        this.setState({
            selectedCard: this.state.listCard[selectedIndex]
        });
    }

    getTodayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        return [parseInt(yyyy),parseInt(mm),parseInt(dd)];
    }

    isCardValid = () => {

        if (!(Array.isArray(this.state.listCard) && (this.state.listCard.length))){
            alert('No Card registered !');
            return (false);
        }
        else {
            var cardDate = this.state.selectedCard.expired_at.split('-')
            var yyyy = parseInt(cardDate[0]);
            var mm = parseInt(cardDate[1]);
            var dd = parseInt(cardDate[2]);

            if( yyyy > this.getTodayDate()[0]) {
                return(true);
            }
            else {
                if(yyyy === this.getTodayDate()[0]) {
                    if(mm > this.getTodayDate()[1]){
                        return(true);
                    }
                    else {
                        if(mm === this.getTodayDate()[1]){
                            if(dd >= this.getTodayDate()[2]){
                                return(true);
                            }
                        }
                    }
                }
            }
            alert('Card expired!');
            return(false);
        }
     }


    deposit = (event) => {

        event.preventDefault();
        if (this.state.payIn.amount > 0) {
            if (this.isCardValid()) {
                api.addPayIn(this.state.payIn);
                api.depositWallet(this.props.wallet.id, this.state.payIn.amount);
                this.props.onChange()
                this.setState({
                    listPayIns: api.getPayIns(this.props.wallet.id),
                    payIn: {
                        id: api.getNewIdPayIn(),
                        wallet_id: this.state.payIn.wallet_id,
                        amount: this.state.payIn.amount
                    }
                });
                alert("Deposit done !");
            }
        }
        else{
            alert("Amount Impossible !");
        }
    }

    render() {
        return (
            <div className="display-page">
                <div className="deposit-form">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label
                            className="text2-payin">Select Card
                        </Form.Label>
                        <Form.Control
                            as="select"
                            onChange={this.handleSelectCard}>
                            {this.state.listCard.map((card, index) => (
                                <option key={index}>
                                    {card.brand + " xxxxxxxx" + card.last_4 + "    (Expired date: " + card.expired_at + ")"}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <form onSubmit={this.deposit}>
                        <label className="text3-payin">Amount</label>
                        <input
                            id="amount"
                            className="deposit-input"
                            type="number"
                            defaultValue="0"
                            onChange={this.handleChangeAmount}
                        />
                        <br/>
                        <br/>
                        <button className="deposit-button"> Deposit </button>
                    </form>
                </div>
                <div className="display-form">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label
                            className="text-payin">Deposit
                        </Form.Label>
                        {this.state.listPayIns.map((payIn, index) => (
                            <option key={index}>
                                {"Deposit ID: " + payIn.id + "  /   Deposit wallet: " + payIn.wallet_id + "   /   Amount: " + payIn.amount/100}
                            </option>
                        ))}
                    </Form.Group>
                </div>
            </div>
        );
    }
}

export default Deposit;
