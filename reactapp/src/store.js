import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk";
import { browserHistory } from 'react-router'
import { routerMiddleware } from "react-router-redux";

// Import reducers
import  { AppReducer } from "./components/App";
import { UserListReducer } from "./components/UserList";

const reactRouterReduxMiddleware = routerMiddleware(browserHistory);

let createStoreWithMiddleware = applyMiddleware(
  thunk, reactRouterReduxMiddleware
)(createStore);

let reducers = combineReducers({
  AppReducer,
  UserListReducer
});

export default createStoreWithMiddleware(reducers);

