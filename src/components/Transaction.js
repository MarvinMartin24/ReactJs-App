import React, { Component } from 'react';
import * as api from '../services/apiService.js';
import Send from "./transactions/Send.js";
import Deposit from "./transactions/Deposit.js";
import Withdrawal from "./transactions/Withdrawal.js";




class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {
          user: {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        card: {
            user_id: '',
            id:'',
            last_4:'',
            brand:'',
            expired_at:''
        },
        wallets: {
            id: '',
            user_id:'',
            balance:'3OOOO'
        },
        transfer: {
            id: '',
            debited_wallet_id:'',
            credited_wallet_id:'',
            amount: ''
        },
        payIns: {
            id: '',
            wallet_id:'',
            amount:''
        },
        payOuts: {
            id: '',
            wallet_id:'',
            amount:''
        },
        answer: ''
    }
  }

  handleSubmit = (event) => {
        this.setState({ answer: event.target.name });
    }



  render() {
    return (
      <div>
          {this.state.answer === "Send" && <Send />}
          {this.state.answer === "Deposit" && <Deposit />}
          {this.state.answer === "Withdrawal" && <Withdrawal />}
          <br/>
          Go to
          <br/>
          <button onClick={this.handleSubmit} name="Send">Send</button>
          <button onClick={this.handleSubmit} name="Deposit">Deposit</button>
          <button onClick={this.handleSubmit} name="Withdrawal">Withdrawal</button>

      </div>
    );
  }

}
export default Transaction;
