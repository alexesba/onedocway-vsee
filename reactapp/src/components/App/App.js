import React, { Component } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router";
import style from "./style.scss";
import { UserListContainer } from "../UserList";
import 'react-select/dist/react-select.css';

class App extends Component {

  render() {
    return (
			<div>
        <UserListContainer/>
			</div>
    );
  }

};

export default CSSModules(App, style);
