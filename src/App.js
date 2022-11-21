import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineesPage from './pages/TraineesPage';
import NotFoundPage from './pages/NotFoundPage';
import TraineePage from './pages/TraineePage';
import GroupsPage from './pages/GroupsPage';
import { AppContext } from './contexts/AppContext';
import { storage } from './storage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
	const [user, setUser] = useState(null);
	const [trainees, setTrainees] = useState([]);
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(false);

	if (storage.get('user_session')) {
		if (!user) {
			setUser(storage.get('user_session'));
		}
	}

	return (
		<AppContext.Provider
			value={{ user, setUser, trainees, setTrainees, groups, setGroups }}
		>
			<p>Project GYM</p>
			<Router>
				<Routes>
					<Route path='/' element={<WelcomePage></WelcomePage>} />
					{!user && <Route path='/login' element={<LoginPage></LoginPage>} />}
					{user && (
						<Route
							path='/home'
							element={
								<MainPage spinner={loading} setLoading={setLoading}></MainPage>
							}
						/>
					)}
					{user && (
						<Route
							path='/trainees'
							element={
								<TraineesPage
									spinner={loading}
									setLoading={setLoading}
								></TraineesPage>
							}
						/>
					)}
					{user && (
						<Route
							path='/trainees/:name'
							element={
								<TraineePage
									spinner={loading}
									setLoading={setLoading}
								></TraineePage>
							}
						/>
					)}
					{user && (
						<Route
							path='/groups'
							element={
								<GroupsPage
									spinner={loading}
									setLoading={setLoading}
									groups={groups}
									setGroups={setGroups}
								></GroupsPage>
							}
						/>
					)}
					<Route path='*' element={<NotFoundPage></NotFoundPage>} />
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
