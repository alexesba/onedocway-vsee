import { connect } from "react-redux";
import UserList from "./UserList";

import {
  fetchUserList,
  setCurrentUser,
  setUserToCall,
  getLinkToCall
} from "./UserListActions";

const mapStateToProps = (state) => {
  return {
    ...state.UserListReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadUserList: () => dispatch(fetchUserList()),
    onSetCurrentUser: user => dispatch(setCurrentUser(user)),
    onSetUserToCall: user => dispatch(setUserToCall(user)),
    onMakeCall: (from, to) => dispatch(getLinkToCall(from, to))
  }
}

const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default UserListContainer;
