import React, { useState, useEffect } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectRepos } from '../_reducers/repoReducer';
import ReactPaginate from 'react-paginate';
import './Home.css';
import { useHistory } from 'react-router';
import Nav from '../components/Nav';

function Home() {
	const repos = useSelector(selectRepos).repos;
	const history = useHistory();
	const [pagination, setPagination] = useState({
		data: repos?.map((repo, index) => ({
			id: repo.id,
			title: repo.name,
			body: repo.language || 'No main language',
		})),
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

	const selectRepo = (id) => {
		history.push(`repo/${id}`);
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
							onClick={() => selectRepo(repo.id)}
						>
							<Card.Header>{repo.title}</Card.Header>
							<Card.Body>
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
