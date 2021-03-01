import React, { useState, useEffect } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectRepos } from '../../_reducers/repoReducer';
import ReactPaginate from 'react-paginate';
import './Home.css';
import { useHistory } from 'react-router';
import Nav from '../Nav';
import { axios } from '../../util/axiosInstance';
function Home() {
	const repos = useSelector(selectRepos).repos;
	const history = useHistory();

	const fetchImage = (login, name, returnImage) => {
		axios.get(`repos/${login}/${name}/contents/.ghedit?ref=main`).then((result) => {
			console.log('AAA' + result);
			const file = result.data[0].name;
			const link = `https://github.com/${login}/${name}/blob/main/.ghedit/${file}?raw=true`;

			returnImage(link);
		});
	};

	const [pagination, setPagination] = useState({
		data: repos?.map(function (repo, index) {
			const repoDetails = {
				id: repo.id,
				title: repo.name,
				body: repo.language || 'No main language',
				login: repo.owner.login,
				name: repo.name,
				image: `https://github.com/ricksnp/BankApp/blob/main/.ghedit/wallpaper.jpg?raw=true`,
			};
			fetchImage('ricksnp', repo.name, function returnImage(link) {
				repoDetails.image = link;
			});
			return repoDetails;
		}),
		offset: 0,
		numberPerPage: 6,
		pageCount: 0,
		currentData: [],
	});

	useEffect(() => {
		setPagination((prevState) => ({
			...prevState,
			pageCount: prevState.data.length / prevState.numberPerPage,
			currentData: prevState.data.slice(
				pagination.offset,
				pagination.offset + pagination.numberPerPage
			),
		}));
	}, [pagination.numberPerPage, pagination.offset]);

	const handlePageClick = (event) => {
		const selected = event.selected;
		const offset = selected * pagination.numberPerPage;
		setPagination({ ...pagination, offset });
	};

	const selectRepo = (login, name) => {
		history.push(`repos/${login}/${name}`);
	};

	return (
		<>
			<Nav />
			<CardColumns>
				{pagination.currentData &&
					pagination.currentData.map((repo, index) => (
						<Card
							key={repo.id}
							bg="dark"
							text="light"
							style={{ width: '18rem' }}
							className="mb-5 mt-5 ml-5"
							onClick={() => selectRepo(repo.login, repo.name)}
						>
							<Card.Img src={repo.image}></Card.Img>
							<Card.Header>{repo.title}</Card.Header>
							<Card.Body onClick={() => fetchImage('a', 'a')}>
								<Card.Title>{repo.body || 'No main language'}</Card.Title>
								<Card.Text>{repo.description || 'No description yet'}</Card.Text>
							</Card.Body>
						</Card>
					))}
			</CardColumns>
			<ReactPaginate
				previousLabel={'← Previous'}
				nextLabel={'Next →'}
				breakLabel={'...'}
				pageCount={pagination.pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={'pagination'}
				previousLinkClassName={'pagination__link'}
				nextLinkClassName={'pagination__link'}
				disabledClassName={'pagination__link--disabled'}
				activeClassName={'pagination__link--active'}
			/>
		</>
	);
}

export default Home;
