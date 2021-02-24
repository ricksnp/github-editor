import React, { useState, useEffect } from 'react';
import { Card, CardColumns, CardDeck } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { axios } from '../util/axiosInstance';
import { selectUser } from '../_reducers/userReducer';
function Home() {
	const [repos, setRepos] = useState([]);
	const user = useSelector(selectUser);
	const gitHubHandle = user.login;

	useEffect(async () => {
		const result = await axios.get(`/users/${gitHubHandle}/repos`);
		console.log(result.data);
		setRepos(result.data); //instead, we're going to need to set a piece of state in the store and access the repos there
	}, []);

	return (
		<>
			<CardColumns>
				{repos.map((repo, index) => (
					<Card
						key={index}
						bg="dark"
						text="light"
						style={{ width: '18rem' }}
						className="mb-4 ml-4"
					>
						<Card.Header>{repo.name}</Card.Header>
						<Card.Body>
							<Card.Title>Title</Card.Title>
							<Card.Text>LOL</Card.Text>
						</Card.Body>
					</Card>
				))}
			</CardColumns>
		</>
	);
}

export default Home;
