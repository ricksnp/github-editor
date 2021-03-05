import React, { useEffect, useState } from 'react';
import './RepoContent.css';
import { useParams } from 'react-router';
import Nav from '../Nav';
import { axios } from '../../util/axiosInstance';
import { Table } from 'react-bootstrap';

function RepoContent() {
	// Pull in the username and name of the repo from the URL
	const { login, name } = useParams();
	const [repoData, setRepoData] = useState(null);

	// Upon loading the component, fire this request off
	useEffect(() => {
		axios.get(`/repos/${login}/${name}/contents`).then((result) => {
			console.log(result.data);
			setRepoData(result.data);
		});
	}, [login, name]);

	const handleOpen = () => {};

	return (
		<div>
			<Nav />

			<Table striped bordered hover variant="dark" responsive id="repoTable">
				<thead>
					<tr>
						<th>Contents</th>
					</tr>
				</thead>
				<tbody>
					{repoData?.map((repo, index) => (
						<tr key={index}>
							<td id={repo.name}>
								<p onClick={handleOpen}> {repo.name} </p>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* {repoData?.map((repo) => (
				<div key={repo.id}>{repo.name}</div>
			))} */}
		</div>
	);
}

export default RepoContent;
