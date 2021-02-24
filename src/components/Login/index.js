import React, { useEffect } from 'react';
import './Login.css';
import github from '../../assets/github.png';
import { Button } from '@material-ui/core';
import { setUser, logOut } from '../../_actions/userActions';
import { auth, provider } from '../../firebase';
import { useDispatch } from 'react-redux';

function Login() {
	const dispatch = useDispatch();

	const signIn = async () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch(setUser(result.additionalUserInfo.profile));
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="login">
			<div className="login__container">
				<img src={github} alt="github logo" />
				<h1>Signin with GitHub</h1>
				<Button onClick={signIn}>Continue</Button>
			</div>
		</div>
	);
}

export default Login;
