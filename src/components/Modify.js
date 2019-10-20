import React, { Component } from 'react';



class Modify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }

    }

  }

  componentDidMount() {
      const userLocal = JSON.parse(localStorage.getItem('user_local'));
      let user = Object.assign({}, userLocal);

      this.setState({
          user,
      });
    }


    handleChange = (event) => {
        event.preventDefault();

        let formValues = this.state.user;
        let idForm = event.target.id;
        let newValue = event.target.value;

        formValues[idForm] = newValue;
        this.setState({formValues})

    }

    submit = () => {
      const signUpUser = this.state.user;
      localStorage.setItem('user_local', JSON.stringify(signUpUser));
    }


  render() {
    return (
        <div>
          <form onSubmit={this.submit}>
            <label>First Name:</label>
            <input id="first_name" type="text" value={this.state.user.first_name} onChange={this.handleChange}/>

            <br/>


            <label>Last Name:</label>
            <input id="last_name" type="text" value={this.state.user.last_name} onChange={this.handleChange}/>

            <br/>

            <label>Email:</label>
            <input id="email" type="text" value={this.state.user.email} onChange={this.handleChange}/>

            <br/>

            <label>Password:</label>
            <input id="password" type="password" value={this.state.user.password} onChange={this.handleChange}/>

            <br/>
            <button >Modify</button>
          </form>
        </div>
    );
  }

}
export default Modify;
