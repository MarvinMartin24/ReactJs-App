import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import * as api from '../../services/apiService.js';



class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: api.getNewIdTransfer(),
            debited_wallet_id: this.props.walletId,
            credited_wallet_id:'',
            amount: 0,
            listTransfers: api.getTransfers(this.props.walletId),
        };
    }

    handleChangeAmount = (event) => {
        event.preventDefault();

        this.setState({
            amount: parseInt(event.target.value),
        });
    }

    handleChangeCredit = (event) => {
        event.preventDefault();

        this.setState({
            credited_wallet_id: api.getWalletIdFromEmail(event.target.value),
        })
    }

    displayTransfers = () => {
        const listItems = this.state.listTransfers.map((transfer) =>
            <li>{transfer}</li>
        );
        return <ul>{listItems}</ul>;
    }
    

    isEmailValid = () => {

        if ((this.state.credited_wallet_id.status === 'success') && (this.state.credited_wallet_id.result !== this.props.walletId)){
            return(true);
        }
        else{
            alert('Wrong Email');
            return(false);
        }
    }

    isAmountValid = () => {
        if (this.state.amount <= this.props.solde){
            return(true);
        }
        else{
            alert('Your solde is too low');
            return(false);
        }
    }

    transfer = (event) => {
        event.preventDefault();

        if ((this.isEmailValid() === true) && (this.isAmountValid() === true)){

            api.addTransfert(this.state);
            api.updateWallets(this.state.debited_wallet_id, this.state.credited_wallet_id.result, this.state.amount);
            this.props.onChange()
            alert('Transaction done !');
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.transfer}>
                    <label> Amount: </label>
                    <input
                        id="amount"
                        type="number"
                        onChange={this.handleChangeAmount}
                    />
                        <br/>
                    <label> Email: </label>
                    <input
                        id="credited_wallet_id"
                        type="text"
                        onChange={this.handleChangeCredit}
                    />
                        <br/>
                    <button> Transfer </button>
                </form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Transfers list :</Form.Label>
                        {
                            this.state.listTransfers.map((transfer, index) => (
                                    <option key={index}>
                                        {"Transfer ID: " + transfer.id + "  /   Debited wallet ID: " + transfer.debited_wallet_id + "   /   Credited wallet ID: " + transfer.credited_wallet_id + 
                                        "   /   Amount: " + transfer.amount}
                                    </option>
                                ))
                        }
                </Form.Group>
            </div>
        );
    }
}

export default Send;
