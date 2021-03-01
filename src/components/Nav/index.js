import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../_reducers/userReducer';
import SearchIcon from '@material-ui/icons/Search';
import { logOut } from '../../_actions/userActions';
import EditIcon from '@material-ui/icons/Edit';
import { auth } from '../../firebase';
import { Redirect } from 'react-router-dom';
import { clearRepos } from '../../_actions/repoActions';
import { axios } from '../../util/axiosInstance';
import { setSearchedUser } from '../../_actions/searchedUserActions';
import { useHistory } from 'react-router';

function Nav() {
	const currentUser = useSelector(selectUser).user;
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const history = useHistory();

	const logoutOfApp = () => {
		dispatch(logOut());
		dispatch(clearRepos());
		auth.signOut();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.get(`users/${search}/repos`).then((result) => {
			dispatch(setSearchedUser(result.data));
			history.push(`/user/${search}`);
		});
		var form = document.getElementById('searchuser');
		form.reset();
	};

	return (
		<div className="header">
			<div className="header__left">
				<h1>GH Edit</h1>
				<EditIcon />
				<div className="header__search">
					<SearchIcon />
					<form onSubmit={handleSubmit} id="searchuser">
						<input
							type="text"
							placeholder="Search"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</form>
				</div>
			</div>
			<div className="header__right">
				<Avatar src={currentUser?.avatar_url} onClick={logoutOfApp}>
					<Redirect to="/" />
				</Avatar>
			</div>
		</div>
	);
}

export default Nav;
