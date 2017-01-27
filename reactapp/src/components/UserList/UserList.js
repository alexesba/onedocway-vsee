import React, { Component, PropTypes } from "react";
import Dropdown from 'react-select';
import CSSModules from "react-css-modules";
import style from "./style.scss";
import _ from "lodash";

class UserList extends Component {
  static propTypes = {
    onLoadUserList: PropTypes.func.isRequired,
    onSetCurrentUser: PropTypes.func.isRequired,
    onSetUserToCall: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    currrentUser: PropTypes.object,
    userToCall: PropTypes.object
  }

  static defaultProps = {
    onLoadUserList: () => console.log("Override onLoadUserList method"),
    onSetCurrentUser: (user) => console.log("Override onSetCurrentUser method", user),
    onSetUserToCall: (user) => console.log("Override onSetUserToCall method", user),
    onMakeCall: () => console.log("Override onMakeCall method"),
    users: [],
    currentUser: {},
    userToCall: {}
  }

  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setUserToCall = this.setUserToCall.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.renderButtonCall = this.renderButtonCall.bind(this);
    this.bothSelected = this.bothSelected.bind(this);
    this.makeCall = this.makeCall.bind(this);
  }

  componentDidMount() {
    this.props.onLoadUserList();
  }

  setCurrentUser(user) {
    this.props.onSetCurrentUser(user||{})
  }

  makeCall() {
    const { currentUser, userToCall } = this.props;
    this.props.onMakeCall(currentUser, userToCall);
  }

  setUserToCall(user) {
    this.props.onSetUserToCall(user||{})
  }

  bothSelected() {
    const { currentUser, userToCall } = this.props;
    return !_.isEmpty(currentUser) && !_.isEmpty(userToCall)
  }

  renderButtonCall() {
    if (!this.bothSelected()) return  <span>Waiting for selection...</span>;
    if (this.props.creatingLink) return <span>Generating link to call..</span>;
    if (!this.props.dataLink)
      return <a href="#" onClick={this.makeCall}>Generate Call</a>
    return (
      <div>
        <a href={this.props.dataLink}> Launch Vsee </a>
      </div>
    )

  }

  getOptions() {
    const { user, currentUser, userToCall } = this.props;
    return this.props.users.map(item => {
      if ([currentUser.id, userToCall.id].includes(item.id)) {
        return _.assign(item, { disabled: true })
      }
      return _.omit(item, 'disabled')
    })
  }

  render() {
    return (
      <div style={{width: 400, margin: "0 auto"}}>
          <Dropdown options={ this.getOptions(this.props.currentUser) }
            onChange={ this.setCurrentUser }
            value={ this.props.currentUser.id}
            placeholder="Select a user"
            labelKey="display_name"
            valueKey="id"
          />
        <Dropdown options={ this.getOptions(this.props.userToCall) }
          onChange={ this.setUserToCall }
          value={ this.props.userToCall.id }
          placeholder="Select someone to call"
          labelKey="display_name"
          valueKey="id"
        />
        { this.renderButtonCall() }
      </div>
    );
  }
}

export default CSSModules(UserList, style);
