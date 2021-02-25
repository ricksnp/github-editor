import React from 'react';
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

function Nav() {
	const currentUser = useSelector(selectUser).user;
	const dispatch = useDispatch();

	const logoutOfApp = () => {
		dispatch(logOut());
		dispatch(clearRepos());
		auth.signOut();
	};

	return (
		<div className="header">
			<div className="header__left">
				<h1>GH Edit</h1>
				<EditIcon />
				<div className="header__search">
					<SearchIcon />
					<input type="text" placeholder="Search" />
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
