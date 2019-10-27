import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import * as api from '../../services/apiService.js';
import './Send.css';




class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transfer: {
                id: api.getNewIdTransfer(),
                debited_wallet_id: this.props.walletId,
                credited_wallet_id:'',
                amount: 0,
            },
            listTransfers: api.getTransfers(this.props.walletId)
        };
    }

    handleChangeAmount = (event) => {
        event.preventDefault();

        this.setState({
            transfer: {
                id: this.state.transfer.id,
                debited_wallet_id: this.props.walletId,
                credited_wallet_id: api.getWalletIdFromEmail(event.target.value),
                amount: parseInt(event.target.value)*100,
            }
        });
    }

    handleChangeCredit = (event) => {
        event.preventDefault();

        this.setState({
            transfer: {
                id: this.state.transfer.id,
                debited_wallet_id: this.props.walletId,
                credited_wallet_id: api.getWalletIdFromEmail(event.target.value),
                amount: this.state.transfer.amount
            }
        })
    }

    displayTransfers = () => {
        const listItems = this.state.transfer.listTransfers.map((transfer) =>
            <li>{transfer}</li>
        );
        return <ul>{listItems}</ul>;
    }


    isEmailValid = () => {

        if ((this.state.transfer.credited_wallet_id !== this.props.walletId) && (this.state.transfer.credited_wallet_id.status !== 'failure')){
            return(true);
        }
        else{
            alert('Wrong Email');
            return(false);
        }
    }

    isAmountValid = () => {
        if (this.state.transfer.amount <= this.props.solde){
            return(true);
        }
        else{
            alert('Your solde is too low');
            return(false);
        }
    }

    transfer = (event) => {
        event.preventDefault();

        if ((this.isEmailValid()) && (this.isAmountValid())){

            api.addTransfert(this.state.transfer);
            api.updateWallets(this.state.transfer.debited_wallet_id, this.state.transfer.credited_wallet_id, this.state.transfer.amount);
            this.props.onChange()
            this.setState({
                listTransfers: api.getTransfers(this.props.walletId),
            });

            alert('Transaction done !');
        }
    }

    render() {
        console.log(this.state.transfer);
        return (
            <div className="display-page">
                <form className="send-form" onSubmit={this.transfer}>
                    <label className="text2-transfers"> Amount </label>
                    <input
                        id="amount"
                        className="send-input"
                        type="number"
                        onChange={this.handleChangeAmount}
                    />
                    <label className="text3-transfers"> Email </label>
                    <input
                        id="credited_wallet_id"
                        className="send-input"
                        type="text"
                        onChange={this.handleChangeCredit}
                    />
                    <br/>
                    <br/>
                    <button className="send-button"> Transfer </button>
                </form>
                <div className="display-form">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label
                            className="text-transfers">Transfers
                        </Form.Label>
                        {this.state.listTransfers.map((transfer, index) => (
                            <option key={index}>
                                {"Transfer ID: " + transfer.id + "  /   Debited wallet ID: " + transfer.debited_wallet_id + "   /   Credited wallet ID: " +
                                transfer.credited_wallet_id + "   /   Amount: " + transfer.amount/100}
                            </option>
                        ))}
                    </Form.Group>
                </div>
            </div>
        );
    }
}

export default Send;
