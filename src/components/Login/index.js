import React from 'react';
import './Login.css';
import github2 from '../../assets/Octocat.png';
import { Button } from '@material-ui/core';
import { setUser } from '../../_actions/userActions';
import { auth, provider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setRepos } from '../../_actions/repoActions';
import { axios } from '../../util/axiosInstance';
import { useHistory } from 'react-router';

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	let gitHubHandle;

	/* Sign in with GitHub, get the GitHub username from the login, 
	 fetch all of your repositories, and dispatch the repos and the 
	 current user to the store. */
	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				gitHubHandle = result.additionalUserInfo.profile.login;
				axios.get(`users/${gitHubHandle}/repos`).then((res) => {
					dispatch(setUser(result.additionalUserInfo.profile));
					dispatch(setRepos(res.data));
					history.push(`/home`);
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="login">
			<div className="login__container">
				<img src={github2} alt="github logo" />
				<h1>Signin with GitHub</h1>
				<Button onClick={signIn}>Continue</Button>
			</div>
		</div>
	);
}

export default Login;
