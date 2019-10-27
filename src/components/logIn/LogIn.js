import React, { Component } from 'react';
import * as api from '../../services/apiService.js';
import './LogIn.css';



class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {

      const localUser = JSON.parse(localStorage.getItem('user_local'));

      if (localUser) {

          this.setState({
              email: localUser.email,
              password: localUser.password
          });
      }
    }

    handleChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            [input.id]: value
        });
    }

    login = (event) => {
        event.preventDefault();

        // Verification function
        const response = api.authenticate(this.state.email, this.state.password);

        // Verification sucessed
        if(response.status === 'success'){

            const user = response.result;
            localStorage.setItem('user_local', JSON.stringify(user));

            alert('Logged in !');

            localStorage.setItem('view', JSON.stringify('NavBar2'));
            this.props.view();

            this.props.history.push('/home');
        }
        else {
            alert(response.error);
        }
    }

    render() {
        return (
            <div className="log-in-form">
                <form onSubmit={this.login}>
                    <label>Email:</label>
                    <input
                        id="email"
                        className="log-in-input"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                        <br/>
                    <label>Password:</label>
                    <input
                        id="password"
                        className="log-in-input"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                        <br/>
                        <br/>
                    <button className="log-in-button">Login</button>
                </form>
            </div>
        );
    }
}

export default LogIn;
