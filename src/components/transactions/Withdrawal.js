import React, { Component } from 'react';
import { Form } from "react-bootstrap";




class Withdrawal extends Component {
    constructor(props) {
      super(props);
      this.state = {
            listCard: [],
            selectedCard: {
                user_id: '',
                id:'',
                last_4:'',
                brand:'',
                expired_at:''
            },
            payOut: {
                id: '',
                wallet_id:'',
                amount:''
            }

      };
    }

    componentDidMount() {
        let listCard =[]
        const cardLocal = JSON.parse(localStorage.getItem('cards_local'));
        if (cardLocal){
           listCard = Object.assign([], cardLocal);
        }
        this.setState({
            listCard,
            selectedCard: listCard[0]

        });
    }

    handleChangeAmount = (event) => {
        event.preventDefault();
        this.setState({
             payIn: {
                id: Math.floor(Math.random() * 1000),
                wallet_id:this.props.wallet.id,
                amount: parseInt(event.target.value),
            }
        })
    }

    handleSelectCard = (event) => {
        event.preventDefault();
        console.log(event.target.options.selectedIndex);
        const selectedIndex = event.target.options.selectedIndex;

        this.setState({
              selectedCard: this.state.listCard[selectedIndex]
        })
    }

    getTodayDate(){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          return [parseInt(yyyy),parseInt(mm),parseInt(dd)];
    }

    isCardValid = () =>{
        var cardDate = this.state.selectedCard.expired_at.split('-')
        var yyyy = parseInt(cardDate[0]);
        var mm = parseInt(cardDate[1]);
        var dd = parseInt(cardDate[2]);
        console.log( this.state.selectedCard);

        if( yyyy > this.getTodayDate()[0] ){
            return(true);
        }
        else {
            if(yyyy === this.getTodayDate()[0]) {

                if(mm > this.getTodayDate()[1]){
                    return(true);
                }
                else{

                    if(mm === this.getTodayDate()[1]){

                        if(dd > this.getTodayDate()[2]){
                            return(true);
                        }
                    }
                }

            }
          }
          alert("Card expired!");
          return(false);
      }

      addToPayOutList = () =>{
      // add to localStorage the transfer
          var newPayOut = this.state.payIn;
          var allLocalPayOuts = JSON.parse(localStorage.getItem('payOuts_local'));

          allLocalPayOuts.push(newPayOut);
          localStorage.setItem('payOuts_local', JSON.stringify(allLocalPayOuts));
      }

      updateUserLocalBalance = () =>{
          // update in the localStorage the user wallet
          let walletLocal = JSON.parse(localStorage.getItem('wallet_local'));
          walletLocal.balance -= this.state.payIn.amount;
          localStorage.setItem('wallet_local', JSON.stringify(walletLocal));
      }

      deposit = () => {
          if ((this.isCardValid() === true) ){
            this.addToPayOutList();
            this.updateUserLocalBalance();
            alert("Withdrawal done !");
            this.props.history.push("/Transaction");

          }


      }




    render() {
        console.log(this.state);
      return (
          <div >
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>select Card</Form.Label>
            <Form.Control as="select" onChange={this.handleSelectCard}>
            {
                this.state.listCard.map(
                   (card, index) =>(
                      <option key={index}>
                          {card.brand +" xxxxxxxx"+card.last_4 +"     (Expired date: "+card.expired_at + ")"}
                      </option>
                  )
               )
            }
            </Form.Control>
          </Form.Group>
          <br/>
          <form onSubmit={this.deposit}>
            <label>Amount:</label>
            <input id="amount" type="number"  onChange={this.handleChangeAmount}/>
            <button >Withdrawal</button>
          </form>
          </div>

      );
    }

    }
export default Withdrawal;
