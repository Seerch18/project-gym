import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import TraineeForm from '../components/Trainee/TraineeForm';
import Spinner from '../components/Spinner';
import { getTrainee } from '../actions/TraineeActions';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import NavTopButton from '../components/NavTopButton/NavTopButton';

const TraineePage = ({ spinner, setLoading }) => {
	const { user } = useContext(AppContext);
	const [trainee, setTrainee] = useState(null);
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const id = query.get('id');

	useEffect(() => {
		if (id) {
			setLoading(true);
			getTrainee(id, user.token)
				.then((res) => {
					setTrainee(res);
					setLoading(false);
				})
				.catch(() => setLoading(false));
		}
	}, []);

	const btnBack = (
		<Link to={'/trainees'} className='btn btn-primary'>
			Atrás
		</Link>
	);

	return (
		<AppFrame>
			<div>
				<NavTopButton btnBack={btnBack}></NavTopButton>
				{!spinner && trainee ? (
					<Row className='justify-content-center mx-5 mt-4'>
						<Col xs='auto'>
							<TraineeForm
								trainee={trainee}
								setTrainee={setTrainee}
							></TraineeForm>
						</Col>
					</Row>
				) : (
					<Spinner></Spinner>
				)}
			</div>
		</AppFrame>
	);
};

TraineePage.propTypes = {
	spinner: PropTypes.bool,
	setLoading: PropTypes.func,
};

export default TraineePage;
