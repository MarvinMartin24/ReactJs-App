import React, { Component } from 'react';
import './LogOut.css';


class LogOut extends Component {

    exit = (event) => {
        event.preventDefault();
        localStorage.setItem('view', JSON.stringify('NavBar'));
        this.props.view();
        this.props.history.push('/');

    }

    stay = (event) => {
        event.preventDefault();
        this.props.history.push('/Home');
    }


    render() {
        return (
            <div>
                <br/>
                    <div className="text-logout"> Are you sure to log out ?
                <br/>
                    <br/>
                        <button className="logout-yes-button" onClick={this.exit}>yes</button>
                        <button className="logout-no-button" onClick={this.stay}>no</button>
                </div>
            </div>

        );
    }
}
export default LogOut;
