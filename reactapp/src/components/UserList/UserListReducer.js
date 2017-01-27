import {
  FETCH_USER_LIST_START,
  FETCH_USER_LIST_SUCCESS,
  SET_CURRENT_USER,
  SET_USER_TO_CALL,
  GET_LINK_TO_CALL_START,
  GET_LINK_TO_CALL_SUCCESS
} from "./UserListActions";

const DEFAULT_STATE = {
  users: [],
  isFetching: false,
  currrentUser: {},
  creatingLink: false,
  userToCall: {},
  dataLink: undefined
}

export default (state = DEFAULT_STATE, action ) => {
  switch (action.type) {
    case FETCH_USER_LIST_START:
      return { ...state, isFetching: true };
    case FETCH_USER_LIST_SUCCESS:
      return { ...state, isFetching: false, users: action.users };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.user };
    case SET_USER_TO_CALL:
      return { ...state, userToCall: action.user };
    case GET_LINK_TO_CALL_START:
      return { ...state, creatingLink: true };
    case GET_LINK_TO_CALL_SUCCESS:
      return { ...state, creatingLink: false, dataLink: action.dataLink };
    default:
      return state;
  }
}
