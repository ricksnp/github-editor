const initialState = {
	searchedUser: null,
};

// Your user reducer, takes in initialState which is empty, and also an action
// which is referenced in userActions.js, but all we do is return the result from a fetch request
// otherwise, just return state, which is empty object right now
export const searchedUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SEARCHED_USER':
			return { ...state, searchedUser: action.payload };
		default:
			return state;
	}
};

export const selectSearchedUser = (state) => state.searchedUser;
