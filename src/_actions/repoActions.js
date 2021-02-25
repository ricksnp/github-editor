export const SET_REPOS = 'SET_REPOS';
export const CLEAR_REPOS = 'CLEAR_REPOS';

export const setRepos = (payload) => {
	return { type: SET_REPOS, payload };
};

export const clearRepos = () => {
	return { type: CLEAR_REPOS };
};
