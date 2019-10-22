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
      this.setState({
          credited_wallet_id: api.getWalletIdFromEmail(event.target.value),
      })
      console.log(this.state);
  }

  isEmailValid = () =>{
      // Verification sucessed
      var userWalletId = JSON.parse(localStorage.getItem('wallet_local'));
      console.log(userWalletId.id);
      if((this.state.credited_wallet_id.status === "success") && (this.state.credited_wallet_id.result !== userWalletId.id )){
          return(true);
      }
      // Verification failed
      else{

          alert("Wrong Email");
          return(false);
      }
    }

  isAmountValid = () =>{
        // Verification sucessed
        if(this.state.amount <= this.props.solde){
            return(true);
        }
        // Verification failed
        else{

            alert("Your solde is too low");
            return(false);
        }
      }

  addToTransfertList = () =>{
      // add to localStorage the transfer
      var newTransfer = this.state;
      newTransfer.credited_wallet_id = Object.assign(newTransfer.credited_wallet_id.result);
      var allLocalTransfer = JSON.parse(localStorage.getItem('transfers_local'));
      allLocalTransfer.push(newTransfer);
      localStorage.setItem('transfers_local', JSON.stringify(allLocalTransfer));
  }

  addToCreditedWalletList = () =>{
      // add to localStorage the transfer

      var allLocalCreditedWallet = JSON.parse(localStorage.getItem('credited_wallet'));
      let creditedWallet = api.getWalletFromWalletId(this.state.credited_wallet_id);
      creditedWallet.balance +=  this.state.amount;


      // credited_wallet already exist
      if (allLocalCreditedWallet){
          let index = allLocalCreditedWallet.findIndex(wallet => wallet.id == this.state.credited_wallet_id);

          if (index > -1){ // credited wallet is in allLocalCreditedWallet
              allLocalCreditedWallet[index].balance += this.state.amount;
              allLocalCreditedWallet.splice(index, 1, allLocalCreditedWallet[index]);
          }
          else{ // credited wallet is not in allLocalCreditedWallet
              allLocalCreditedWallet.push(creditedWallet);

          }
      }
      // credited_wallet does not exist yet
      else {
          allLocalCreditedWallet = []
          allLocalCreditedWallet.push(creditedWallet);
      }

      // Put result in localStorage
      localStorage.setItem('credited_wallet', JSON.stringify(allLocalCreditedWallet));
  }

  updateUserLocalBalance = () =>{
      // update in the localStorage the user wallet
      let walletLocal = JSON.parse(localStorage.getItem('wallet_local'));
      walletLocal.balance = walletLocal.balance - this.state.amount;
      localStorage.setItem('wallet_local', JSON.stringify(walletLocal));
  }


  transfer = () => {
      if ((this.isEmailValid() === true) && (this.isAmountValid() === true) ){
          this.addToTransfertList();
          this.updateUserLocalBalance();
          this.addToCreditedWalletList();
          alert("Transaction done !");
      }

  }

  render() {
    console.log(this.state);
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
