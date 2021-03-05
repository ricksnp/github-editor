import React from 'react';
import './SearchedUser.css';
import { selectSearchedUser } from '../../_reducers/searchedUserReducer';
import { useSelector } from 'react-redux';

function SearchedUser() {
	const searched = useSelector(selectSearchedUser).searchedUser;

	// const selectRepo = (login, name) => {
	// 	//history.push(`repos/${login}/${name}`);
	// };
	return (
		<div style={{ color: 'white' }}>
			{searched.map((repo) => (
				<div key={repo.id}>{repo.name}</div>
			))}
		</div>
	);
}

export default SearchedUser;
