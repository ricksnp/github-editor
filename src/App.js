import React, { useEffect } from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './_reducers/userReducer';
import { auth } from './firebase';
import { logOut, setUser } from './_actions/userActions';
import Home from './views/Home';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	auth.onAuthStateChanged((userAuth) => {
	// 		dispatch(logOut());
	// 	});
	// }, []);
	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<>
					<Nav />
					<div className="app__body">
						<Home />
					</div>
				</>
			)}
		</div>
	);
}

export default App;
