// an empty repos object is all we have right now
const initialState = {
	repos: null,
};

// Your repos reducer, takes in initialState which is empty, and also an action
// which is referenced in repoActions.js, but all we do is return the result from a fetch request
// otherwise, just return state, which is empty object right now
export const repoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_REPOS':
			return { ...state, repos: action.payload };
		case 'CLEAR_REPOS':
			return { repos: null };
		default:
			return state;
	}
};

export const selectRepos = (state) => state.repos;
