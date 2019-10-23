import React, { Component } from 'react';
import Send from "./transactions/Send.js";
import Deposit from "./transactions/Deposit.js";
import Withdrawal from "./transactions/Withdrawal.js";
import { BrowserRouter, Route, Link } from "react-router-dom"
import { Button } from 'react-bulma-components';






class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {

        wallet: {
            id: '',
            user_id:'',
            balance:''
        }
    }
  }

  componentDidMount() {

      const walletLocal = JSON.parse(localStorage.getItem('wallet_local'));
      let wallet = Object.assign({}, walletLocal);

      this.setState({
          wallet
      })
  }


  render() {
    return (

          <BrowserRouter>
          <br/>

              <Link to="/Transaction/Send">
                <Button renderAs="button" name="Send">
                    <span>Send</span>
                </Button>
              </Link>
              <Link to="/Transaction/Deposit">
                <Button renderAs="button" name="Deposit">
                    <span>Deposit</span>
                </Button>
              </Link>
              <Link to="/Transaction/Withdrawal">
                <Button renderAs="button" name="Withdrawal">
                    <span>Withdrawal</span>
                </Button>
              </Link>

              <div>
              <br/>

                Solde: {this.state.wallet.balance}
              </div>
               <br/>

              <Route path="/Transaction/Send" render={(props) => <Send {...props} walletId={this.state.wallet.id} solde={this.state.wallet.balance}/>} />
              <Route path="/Transaction/Deposit" render={(props) => <Deposit {...props} wallet={this.state.wallet}/>} />
              <Route path="/Transaction/Withdrawal" render={(props) => <Withdrawal {...props} wallet={this.state.wallet}/>} />
          </BrowserRouter>



    );
  }

}
export default Transaction;
