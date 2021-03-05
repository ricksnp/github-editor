import Axios from 'axios';

// All api calls are made using this axios instance, with the token
// being a personal access token from GitHub
const token = process.env.REACT_APP_GITHUB_TOKEN;
export const axios = Axios.create({
	baseURL: 'https://api.github.com/',
	headers: {
		authorization: `token ${token}`,
	},
});
