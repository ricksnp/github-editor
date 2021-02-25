import Axios from 'axios';

export const axios = Axios.create({
	baseURL: 'https://api.github.com/',
	headers: {
		authorization: '3916a629ffe47b654e0621bc7d5ea6e83d19fdd1',
	},
});
