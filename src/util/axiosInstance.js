import Axios from 'axios';

export const axios = Axios.create({
	baseURL: 'https://api.github.com/',
	headers: {
		authorization: 'token ',
		// 'Access-Control-Allow-Origin': '*',
		// 'User-Agent': 'request',
	},
});
