import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import * as api from '../../services/apiService.js';
import './Withdrawal.css';




class Withdrawal extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user_local')),
            listCard: api.getCards(JSON.parse(localStorage.getItem('user_local')).id),
            selectedCard: api.getCards(JSON.parse(localStorage.getItem('user_local')).id)[0],
            listPayOuts: api.getPayOuts(this.props.wallet.id),
            payOut: {
                id: api.getNewIdPayOut(),
                wallet_id:'',
                amount:''
            }
        };
    }

    componentDidMount() {
        this.setState({
            listCard: api.getCards(this.state.user.id),
        });
    }

    handleChangeAmount = (event) => {
        event.preventDefault();

        this.setState({
            payOut: {
                id: this.state.payOut.id,
                wallet_id:this.props.wallet.id,
                amount: parseInt(event.target.value)*100,
            }
        });
    }

    handleSelectCard = (event) => {
        event.preventDefault();

        var selectedIndex = event.target.options.selectedIndex;

        this.setState({
              selectedCard: this.state.listCard[selectedIndex]
        });
    }

    getTodayDate() {

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();

          return [parseInt(yyyy),parseInt(mm),parseInt(dd)];
    }

    isCardValid = () => {

        var cardDate = this.state.selectedCard.expired_at.split('-')
        var yyyy = parseInt(cardDate[0]);
        var mm = parseInt(cardDate[1]);
        var dd = parseInt(cardDate[2]);

        if( yyyy > this.getTodayDate()[0]) {
            return(true);
        }
        else {
            if(yyyy === this.getTodayDate()[0]) {
                if(mm > this.getTodayDate()[1]){
                    return(true);
                }
                else {
                    if(mm === this.getTodayDate()[1]){
                        if(dd > this.getTodayDate()[2]){
                            return(true);
                        }
                    }
                }
            }
        }
        alert('Card expired!');
          return(false);
      }

      isAmountValid = () => {

          if(this.state.payOut.amount <= this.props.solde){
              return(true);
          }
          else{
              alert('Your Withdrawal is too high');
              return(false);
          }
      }

      withdrawal = (event) => {

          event.preventDefault();
          if ((this.isCardValid() === true) && (this.isAmountValid() === true)){

              api.addPayOut(this.state.payOut);
              api.withdrawalWallet(this.props.wallet.id, this.state.payOut.amount);
              this.props.onChange()
              this.setState({
                  listPayOuts: api.getPayOuts(this.props.wallet.id),
                  payOut: {
                      id: api.getNewIdPayOut(),
                      wallet_id: this.state.payOut.wallet_id,
                      amount: this.state.payOut.amount

                  }
              });
              alert('Withdrawal done !');
          }

      }

      render() {
          return (
              <div>
                <div className="deposit-form">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label className="text2-payin">Select Card</Form.Label>
                          <Form.Control as="select" onChange={this.handleSelectCard}>
                              {
                                  this.state.listCard.map((card, index) => (
                                        <option key={index}>
                                            {card.brand + " xxxxxxxx" + card.last_4 + "    (Expired date: " + card.expired_at + ")"}
                                        </option>
                                    ))
                              }
                          </Form.Control>
                  </Form.Group>
                  <form onSubmit={this.withdrawal}>
                      <label className="text3-payin">Amount</label>
                      <input
                          id="amount"
                          className="deposit-input"
                          type="number"
                          onChange={this.handleChangeAmount}
                      />
                      <br/>
                      <br/>
                      <button className="deposit-button"> Withdrawal </button>
                  </form>
              </div>
              <div className="display-page">
                  <div className="display-form">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label className="text-payin">Withdrawal</Form.Label>
                          {
                              this.state.listPayOuts.map((payOut, index) => (
                                      <option key={index}>
                                          {"Withdrawal ID: " + payOut.id + "  /   Withdrawal wallet: " + payOut.wallet_id + "   /   Amount: " + payOut.amount/100}
                                      </option>
                                  ))
                          }
                  </Form.Group>
                  </div>
              </div>
          </div>
      );
    }
}

export default Withdrawal;
