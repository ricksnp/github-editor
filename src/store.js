import { userReducer } from './_reducers/userReducer';
import { combineReducers, compose, createStore } from 'redux';
import { repoReducer } from './_reducers/repoReducer';
//Minimal store config, make sure you import your reducer(s)

// This enables me to debug in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ user: userReducer, repos: repoReducer });

//export your store
export const store = createStore(rootReducer, composeEnhancers());
