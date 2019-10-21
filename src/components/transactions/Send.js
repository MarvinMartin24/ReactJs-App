import React, { Component } from 'react';
import * as api from '../../services/apiService.js';



class Send extends Component {

  constructor(props) {
    super(props);
    this.state = {
            id: Math.random(),
            debited_wallet_id: this.props.walletId,
            credited_wallet_id:'',
            amount: 0
    }
  }

  handleChangeAmount = (event) => {
      event.preventDefault();
      this.setState({
            amount: parseInt(event.target.value),
      })
      console.log(this.state);

  }

  handleChangeCredit = (event) => {
      event.preventDefault();
      this.setState({
          credited_wallet_id: api.getWalletIdFromEmail(event.target.value),
      })
      console.log(this.state);
  }


  transfer = () => {
      // add to localStorage the transfer
      let transfer  = this.state;
      localStorage.setItem('transfer_local', JSON.stringify(transfer));

      // update in the localStorage the user wallet
      let walletLocal = JSON.parse(localStorage.getItem('wallet_local'));
      walletLocal.balance = walletLocal.balance - this.state.amount;
      localStorage.setItem('wallet_local', JSON.stringify(walletLocal));

      // create in the localStorage the credit user wallet
      let creditedWallet = api.getWalletFromWalletId(this.state.credited_wallet_id)
      creditedWallet.balance = creditedWallet.balance + this.state.amount;
      localStorage.setItem('credited_wallet', JSON.stringify(creditedWallet));

  }

  render() {
    return (
      <div>
        <form onSubmit={this.transfer}>
          <label>Amount:</label>
          <input id="amount" type="number"  onChange={this.handleChangeAmount}/>
          <br/>
          <label>Email:</label>
          <input id="credited_wallet_id" type="text"  onChange={this.handleChangeCredit}/>
          <br/>
          <button >Transfer</button>
        </form>
      </div>
    );
  }

}
export default Send;
