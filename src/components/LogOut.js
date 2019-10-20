import React, { Component } from 'react';



class LogOut extends Component {

    constructor(props) {
    super(props);
    this.state = {

      }
    }

    exit = () =>{
        localStorage.setItem("view", JSON.stringify("NavBar"));
        this.props.view();
        this.props.history.push("/");

    }

    stay = () =>{
        this.props.history.push("/Profile");
    }


    render() {
      return (
        <div>
            Are you sure to log out ?
            <button onClick={this.exit}>yes</button>
            <button onClick={this.stay}>no</button>
          </div>
    );
  }

}
export default LogOut;
