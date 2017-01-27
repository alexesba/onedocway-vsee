export const FETCH_USER_LIST = "FETCH_USER_LIST";
export const FETCH_USER_LIST_START = "FETCH_USER_LIST_START";
export const FETCH_USER_LIST_SUCCESS  = "FETCH_USER_LIST_SUCCESS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_USER_TO_CALL = "SET_USER_TO_CALL";
export const GET_LINK_TO_CALL_START = "GET_LINK_TO_CALL_START";
export const GET_LINK_TO_CALL_SUCCESS = "GET_LINK_TO_CALL_SUCCESS";

import Api from "../../api";

const fetchUserListStart = () => {
  return {
    type: FETCH_USER_LIST_START
  }
}

const fetchUserListSuccess =  users => {
  return {
    type: FETCH_USER_LIST_SUCCESS,
    users
  }
}

export const setCurrentUser = user => {
  return dispatch => {
    return Api.post("vsees", { user })
      .then( () => dispatch({ type: SET_CURRENT_USER, user }))
      .catch(error => console.error(error));
  }
}

export const setUserToCall = user => {

  return dispatch => {
    return Api.post("vsees", { user })
      .then( () => dispatch({ type: SET_USER_TO_CALL, user }))
      .catch(error => console.error(error));
  }
}

const getLinkToCallStart = () => {
  return {
    type: GET_LINK_TO_CALL_START
  }
}

const getLinkToCallSucess = (dataLink) => {
  return {
    type: GET_LINK_TO_CALL_SUCCESS,
    dataLink
  }
}


export const getLinkToCall = (from, to) => {
  return dispatch => {
    dispatch(getLinkToCallStart());
    return Api.post("vsees/uri", { from, to })
      .then(response => response.body)
      .then( response => dispatch(getLinkToCallSucess(response.data)))
      .catch( error => console.error(error))
  }
}

export const fetchUserList = () => {
  return dispatch => {
    dispatch(fetchUserListStart());
    return Api.get("users").then(response => response.body )
      .then(users => {
        dispatch(fetchUserListSuccess(users))
      }
      )
      .catch(error => console.log(error));
  }
}

