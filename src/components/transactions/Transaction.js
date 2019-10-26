import React, { Component } from 'react';
import Send from "./Send.js";
import Deposit from "./Deposit.js";
import Withdrawal from "./Withdrawal.js";
import * as api from '../../services/apiService.js';
import './Transaction.css';


class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: api.getWallet(JSON.parse(localStorage.getItem('user_local')).id),
            answer: ''
        };
    }

    componentDidMount() {
        this.setState({
            wallet: api.getWallet(this.state.wallet.user_id)
        });
    }


    changeSection = (event) => {
        event.preventDefault();
        this.setState({
            answer: event.target.name
        });
    }

    updateSolde = (event) => {
        this.setState({
            wallet:  api.getWallet(this.state.wallet.user_id)
        });
    }
    render() {
        return (
            <div>
                <br/>
                <button className="transaction-first-button" onClick={this.changeSection} name="Send"> Send </button>
                <button className="transaction-button" onClick={this.changeSection} name="Deposit"> Deposit </button>
                <button className="transaction-button" onClick={this.changeSection} name="Withdrawal"> Withdrawal </button>
                    <br/>
                    <br/>
                <div className="solde">
                    Solde: {this.state.wallet.balance/100 + "$"}
                </div>
                    <br/>

                {this.state.answer === "Send" && (
                    <Send
                        walletId={this.state.wallet.id}
                        solde={this.state.wallet.balance}
                        onChange={this.updateSolde}
                    />
                )}
                {this.state.answer === "Deposit" && (
                    <Deposit
                        wallet={this.state.wallet}
                        solde={this.state.wallet.balance}
                        onChange={this.updateSolde}
                    />
                )}
                {this.state.answer === "Withdrawal" && (
                    <Withdrawal
                        wallet={this.state.wallet}
                        solde={this.state.wallet.balance}
                        onChange={this.updateSolde}
                    />
                )}
            </div>
        );
    }
}

export default Transaction;
