import React, { useEffect } from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './_reducers/userReducer';
import { auth } from './firebase';
import { logOut, setUser } from './_actions/userActions';

function App() {
	const currentUser = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(setUser(userAuth.user));
			} else {
				dispatch(logOut());
			}
		});
	}, []);

	return (
		<div className="app">
			<Router>
				{!currentUser ? (
					<Login />
				) : (
					<>
						<Nav />
						<div className="app__body">
							{/* <Sidebar />
							<Switch>
								<Route path="/room/:roomId">
									<Chat />
								</Route>
								<Route path="/"></Route>
							</Switch> */}
						</div>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
