import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import Calendar from '../components/Calendar';
import Spinner from './../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { convertWeekDaysToString, setSessionType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import VerticallyCenteredModal from '../components/Modals/VerticallyCenteredModal';
import SessionList from '../components/Session/SessionList';

const MainPage = ({ spinner, setLoading }) => {
	const { trainees, setTrainees, user, sessions, setSessions } =
		useContext(AppContext);
	const [calendarDay, onChangeCalendarDay] = useState(new Date());
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			if (user.trainees && user.trainees.length !== 0) {
				setTrainees(user.trainees);
			}
		}
		if (!sessions || sessions.length === 0) {
			if (user.sessions && user.sessions.length !== 0) {
				user.sessions = user.sessions.map((session) => setSessionType(session));
				setSessions(user.sessions);
			}
		}
	}, []);

	return (
		<AppFrame>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Calendar
						value={calendarDay}
						onChange={onChangeCalendarDay}
						setShowModal={setShowModal}
					></Calendar>
				</Col>
			</Row>
			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<Link to={'/trainees'} className='btn btn-primary'>
						Alumnos
					</Link>
				</Col>
			</Row>

			<Row className='justify-content-center mt-3'>
				<Col xs='auto'>
					<Link to={'/sessions'} className='btn btn-success'>
						Sesiones
					</Link>
				</Col>
			</Row>
			<VerticallyCenteredModal
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<Row className='justify-content-center mb-3'>
					<Col xs='auto'>
						<h4>
							{convertWeekDaysToString(calendarDay.getDay())}{' '}
							{calendarDay.toLocaleDateString()}
						</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<SessionList currentDate={calendarDay}></SessionList>
					</Col>
				</Row>
			</VerticallyCenteredModal>
		</AppFrame>
	);
};

MainPage.propTypes = {
	spinner: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
};

export default MainPage;
