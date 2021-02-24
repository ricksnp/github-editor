export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';

export const setUser = (payload) => {
	return { type: SET_USER, payload };
};

export const logOut = () => {
	return { type: LOG_OUT };
};
