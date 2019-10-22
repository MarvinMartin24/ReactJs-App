import React, { Component } from 'react';



class Withdrawal extends Component {

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
        }
    }
  }

  render() {
    return (
      <div>
        Withdrawal
      </div>
    );
  }

}
export default Withdrawal;
