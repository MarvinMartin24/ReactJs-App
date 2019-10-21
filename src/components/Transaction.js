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
        wallet: {
            id: '',
            user_id:'',
            balance:''
        },
        answer: ''
    }
  }

  componentDidMount() {
      const userLocal = JSON.parse(localStorage.getItem('user_local'));
      let user = Object.assign({}, userLocal);

      const cardLocal = JSON.parse(localStorage.getItem('cards_local'));
      let card = Object.assign({}, cardLocal[0]);

      const walletLocal = JSON.parse(localStorage.getItem('wallet_local'));
      let wallet = Object.assign({}, walletLocal);



      this.setState({
          user, card, wallet
      })
  }

  changeSection = (event) => {
        this.setState({ answer: event.target.name });
    }



  render() {
      console.log(this.state);
    return (
      <div>
        Solde: {this.state.wallet.balance}
          {this.state.answer === "Send" && <Send walletId={this.state.wallet.id} solde={this.state.wallet.balance} />}
          {this.state.answer === "Deposit" && <Deposit />}
          {this.state.answer === "Withdrawal" && <Withdrawal />}
          <br/>
          Go to
          <br/>
          <button onClick={this.changeSection} name="Send">Send</button>
          <button onClick={this.changeSection} name="Deposit">Deposit</button>
          <button onClick={this.changeSection} name="Withdrawal">Withdrawal</button>

      </div>
    );
  }

}
export default Transaction;
