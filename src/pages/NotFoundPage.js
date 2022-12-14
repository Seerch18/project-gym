import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const NotFoundPage = (props) => {
	const { user } = useContext(AppContext);
	return (
		<Container>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<p className='h3'>PAGE NOT FOUND :( </p>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col xs='auto'>
					<Link to={user ? '/home' : '/login'} className='btn btn-primary'>
						Inicio
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

NotFoundPage.propTypes = {};

export default NotFoundPage;
