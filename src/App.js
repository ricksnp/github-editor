import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import RepoContent from './components/RepoContent';
import SearchedUser from './components/SearchedUser';

function App() {
	return (
		<div className="app">
			<Router>
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/repos/:login/:name" component={RepoContent}></Route>
					<Route path="/user/:userName" component={SearchedUser} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
