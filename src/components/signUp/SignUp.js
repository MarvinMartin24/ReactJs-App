import React, { Component } from 'react';
import * as api from '../../services/apiService.js';
import './SignUp.css';



class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };
    }

    isValid = (user) => {
        if (user.first_name !== '' && user.last_name !== '' && user.password !== '' && user.email !== '')
            return true;
        return false;
    }

    handleChange = (event) => {

        var input = event.target;
        var value = input.value;

        this.setState({
            [input.id]: value
        });
    }

    submit = (event) => {

        event.preventDefault();

        var signUpUser = this.state;
        var available = api.isEmailAvailable(signUpUser.email);

        if (available) {
            if (this.isValid(this.state)){
                signUpUser = api.createUser(signUpUser)

                localStorage.setItem('user_local', JSON.stringify(signUpUser));

                alert('Account Created !')

                this.props.history.push('/log-in');
            }
            else {

                alert('Wrong values, We do not accept empty cell !')
            }
        }
        else {

            alert('Email Already used !')
        }
    }


    render() {
        return (
            <div className="sign-up-form">
                <form onSubmit={this.submit}>
                    <label>First Name:</label>
                    <input
                        id="first_name"
                        className="sign-up-input"
                        type="text"
                        onChange={this.handleChange}
                    />
                        <br/>
                    <label>Last Name:</label>
                    <input
                        id="last_name"
                        className="sign-up-input"
                        type="text"
                        onChange={this.handleChange}
                    />
                        <br/>
                    <label>Email:</label>
                    <input
                        id="email"
                        className={"sign-up-input"}
                        type="email"
                        onChange={this.handleChange}
                    />
                        <br/>
                    <label>Password:</label>
                    <input
                        id="password"
                        className="sign-up-input"
                        type="password"
                        onChange={this.handleChange}
                    />
                        <br/>
                        <br/>
                    <button className="sign-up-button">Create Account</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
