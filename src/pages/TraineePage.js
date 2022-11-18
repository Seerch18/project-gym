import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import TraineeForm from '../components/Trainee/TraineeForm';
import Spinner from '../components/Spinner';
import { getTrainee } from '../actions/TraineeActions';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const TraineePage = ({ spinner, setLoading }) => {
	const [trainee, setTrainee] = useState(null);
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const id = query.get('id');

	useEffect(() => {
		if (id) {
			setLoading(true);
			getTrainee(id).then((res) => {
				setTrainee(res);
				setLoading(false);
			});
		}
	}, []);

	return (
		<AppFrame>
			<div>
				<Row>
					<Col xs='auto'>
						<Link to={'/trainees'} className='btn btn-primary'>
							Atrás
						</Link>
					</Col>
				</Row>
				{!spinner ? (
					<Row className='justify-content-center'>
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
