import React, { useEffect, useState } from 'react';
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
	/* This function is responsible for fetching the contents of this specific folder
	   within each individual user's repository.  Once gathered (as there should only be one image),
	   return a link designating the URL of the background image of each repo card.  If this folder
	   does not exist, the card will not have a background.
	*/
	const fetchImage = (login, name, returnImage) => {
		axios.get(`repos/${login}/${name}/contents/.ghedit?ref=main`).then((result) => {
			const link = `https://github.com/${login}/${name}/blob/main/.ghedit/${result.data[0].name}?raw=true`;
			returnImage(link);
		});
	};

	/* Pagination for the repository results.  I display 
	   6 cards per page, and only map these properties from the repos
	   into the data.  If there is a description, I take the first 50 characters.
	*/
	const [pagination, setPagination] = useState({
		data: repos?.map(function (repo) {
			const repoDetails = {
				id: repo.id,
				body: repo.language || 'No main language',
				login: repo.owner.login,
				name: repo.name,
				description: repo.description
					? repo.description.substring(0, 50) + '...'
					: 'Please add a description to your repository!',
				image: fetchImage('ricksnp', repo.name, function returnImage(link) {
					repoDetails.image = link;
				}),
			};
			return repoDetails;
		}),
		offset: 0,
		numberPerPage: 6,
		pageCount: 0,
		currentData: [],
	});

	// Important that whenever we change a page, we're updating the pagination
	// data, which is why it's also a dependency.

	useEffect(() => {
		setPagination((prevState) => ({
			...prevState,
			pageCount: prevState.data.length / prevState.numberPerPage,
			currentData: prevState.data.slice(
				pagination.offset,
				pagination.offset + pagination.numberPerPage
			),
		}));
	}, [pagination.numberPerPage, pagination.offset, repos]);

	const handlePageClick = (event) => {
		const selected = event.selected;
		const offset = selected * pagination.numberPerPage;
		setPagination({ ...pagination, offset });
	};

	// Anytime I click on a card, I change routes to that respective
	// repo's contents.

	const selectRepo = (login, name) => {
		history.push(`repos/${login}/${name}`);
	};

	return (
		<>
			<Nav />
			<CardColumns>
				{pagination.currentData &&
					pagination.currentData.map((repo) => (
						<Card
							key={repo.id}
							bg="dark"
							text="light"
							style={{ width: '18rem' }}
							className="mb-5 mt-5 ml-5"
							onClick={() => selectRepo(repo.login, repo.name)}
						>
							<Card.Img src={repo.image}></Card.Img>
							<Card.Header>{repo.name}</Card.Header>
							<Card.Body onClick={() => fetchImage('a', 'a')}>
								<Card.Title>{repo.body}</Card.Title>
								<Card.Text>{repo.description}</Card.Text>
							</Card.Body>
						</Card>
					))}
			</CardColumns>
			<ReactPaginate
				previousLabel={'← Previous'}
				nextLabel={'Next →'}
				breakLabel={'...'}
				pageCount={pagination.pageCount}
				onPageChange={handlePageClick}
				pageRangeDisplayed={0}
				containerClassName={'pagination'}
				previousLinkClassName={'pagination__link'}
				nextLinkClassName={'pagination__link'}
				disabledClassName={'pagination__link--disabled'}
				activeClassName={'active hidden'}
			/>
		</>
	);
}

export default Home;
