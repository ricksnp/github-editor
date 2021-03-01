import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Nav from '../Nav';
import { axios } from '../../util/axiosInstance';

function RepoContent() {
	const { login, name } = useParams();

	useEffect(() => {
		axios.get(`/repos/${login}/${name}/contents`).then((result) => {
			//console.log(result);
		});
	});

	return (
		<div>
			<Nav />
			<div style={{ color: 'white' }}>
				This github repo's fullName is {login} {name}
			</div>
		</div>
	);
}

export default RepoContent;
