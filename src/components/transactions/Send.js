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

  isEmailValid = () =>{

      // Verification sucessed
      if((this.state.credited_wallet_id.status === "success") && (this.state.credited_wallet_id.result !== this.props.walletId )){
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


  transfer = (event) => {
      event.preventDefault();
      if ((this.isEmailValid() === true) && (this.isAmountValid() === true) ){

          api.addTransfert(this.state);
          api.updateWallets(this.state.debited_wallet_id, this.state.credited_wallet_id.result, this.state.amount);
          this.props.onChange()
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
