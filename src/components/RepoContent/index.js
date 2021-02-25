import React from 'react';
import { useParams } from 'react-router';
import Nav from '../Nav';

function RepoContent() {
	const { repoId } = useParams();

	return (
		<div>
			<Nav />
			<div style={{ color: 'white' }}>This github repo's ID is {repoId}</div>
		</div>
	);
}

export default RepoContent;
