import React, { Component } from 'react';
import Send from "./transactions/Send.js";
import Deposit from "./transactions/Deposit.js";
import Withdrawal from "./transactions/Withdrawal.js";




class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {

        wallet: {
            id: '',
            user_id:'',
            balance:''
        },
        answer: ''
    }
  }

  componentDidMount() {

      const walletLocal = JSON.parse(localStorage.getItem('wallet_local'));
      let wallet = Object.assign({}, walletLocal);



      this.setState({
          wallet
      })
  }

  changeSection = (event) => {
        this.setState({ answer: event.target.name });
    }



  render() {
    return (
      <div>
        Solde: {this.state.wallet.balance}
          {this.state.answer === "Send" && <Send walletId={this.state.wallet.id} solde={this.state.wallet.balance} />}
          {this.state.answer === "Deposit" && <Deposit wallet={this.state.wallet}/>}
          {this.state.answer === "Withdrawal" && <Withdrawal wallet={this.state.wallet}/>}
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
