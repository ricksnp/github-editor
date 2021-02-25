import React, { useEffect } from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './_reducers/userReducer';
import Home from './views/Home';
import RepoContent from './components/RepoContent';

function App() {
	const user = useSelector(selectUser).user;
	return (
		<div className="app">
			<Router>
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/repo/:repoId" component={RepoContent}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
