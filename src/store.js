import { userReducer } from './_reducers/userReducer';
import { compose, createStore } from 'redux';
//Minimal store config, make sure you import your reducer(s)

// This enables me to debug in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//export your store
export const store = createStore(userReducer, composeEnhancers());
