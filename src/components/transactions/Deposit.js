import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import * as api from '../../services/apiService.js';



class Withdrawal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user_local')),
            listCard: [],
            selectedCard: {
                user_id: '',
                id:'',
                last_4:'',
                brand:'',
                expired_at:''
            },
            payIn: {
                id: '',
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
            selectedCard: this.state.listCard[0],
            payIn: {
                id: Math.floor(Math.random() * 1000),
                wallet_id:this.props.wallet.id,
                amount: parseInt(event.target.value),
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


      deposit = (event) => {

          event.preventDefault();

          if (this.isCardValid()) {
              api.addPayIn(this.state.payIn);
              api.depositWallet(this.props.wallet.id, this.state.payIn.amount);
              this.props.onChange()
              alert("Deposit done !");
          }
      }

      render() {
          return (
              <div>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>select Card</Form.Label>
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
                    <br/>
                <form onSubmit={this.deposit}>
                    <label>Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        onChange={this.handleChangeAmount}
                    />
                    <button> Deposit </button>
                </form>
            </div>
        );
    }
}

export default Withdrawal;
