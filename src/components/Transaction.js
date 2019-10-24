import React, { Component } from 'react';
import Send from "./transactions/Send.js";
import Deposit from "./transactions/Deposit.js";
import Withdrawal from "./transactions/Withdrawal.js";
import * as api from '../services/apiService.js';


class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: {
                id: '',
                user_id: JSON.parse(localStorage.getItem('user_local')).id,
                balance:0
            },
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
                Solde: {this.state.wallet.balance}
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
                    <br/>
                    <br/>
                <button onClick={this.changeSection} name="Send"> Send </button>
                <button onClick={this.changeSection} name="Deposit"> Deposit </button>
                <button onClick={this.changeSection} name="Withdrawal"> Withdrawal </button>
            </div>
        );
    }
}

export default Transaction;
