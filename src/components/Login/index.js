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

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				gitHubHandle = result.additionalUserInfo.profile.login;
				axios.get(`/users/${gitHubHandle}/repos`).then((res) => {
					console.log('in there');
					dispatch(setRepos(res.data));
					dispatch(setUser(result.additionalUserInfo.profile));
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
