// an empty user object is all we have right now
const initialState = {
	user: {},
};

// Your user reducer, takes in initialState which is empty, and also an action
// which is referenced in userActions.js, but all we do is return the result from a fetch request
// otherwise, just return state, which is empty object right now
export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'LOG_OUT':
			return { user: null };
		default:
			return state;
	}
};

export const selectUser = (state) => state.user;
