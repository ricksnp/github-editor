import { userReducer } from './_reducers/userReducer';
import { combineReducers, compose, createStore } from 'redux';
import { repoReducer } from './_reducers/repoReducer';
import { searchedUserReducer } from './_reducers/searchedUserReducer';

// This enables me to debug in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// When setting up the store, combine all the reducers
const rootReducer = combineReducers({
	user: userReducer,
	repos: repoReducer,
	searchedUser: searchedUserReducer,
});

//export your store
export const store = createStore(rootReducer, composeEnhancers());
