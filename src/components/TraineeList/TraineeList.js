import React from 'react';
import PropTypes from 'prop-types';
import TraineeInfo from '../TraineeInfo';
import { Button } from 'react-bootstrap';
import { BsFillPencilFill, BsFillPersonXFill } from 'react-icons/bs';

// se va a convertir en una función que retorna otra función
// const renderTrainee = (eventOnClickTrainee) => (trainee) => {
// 	return (
// 		<li key={trainee} onClick={eventOnClickTrainee}>
// 			<TraineeInfo trainee={trainee}></TraineeInfo>
// 		</li>
// 	);
// };

const renderTrainee = (eventOnClickTrainee, trainee) => {
	return (
		<li key={trainee.name} onClick={eventOnClickTrainee}>
			<TraineeInfo trainee={trainee}>
				{/* <Button variant='warning' onClick={() => console.log('Editar')}>
					<BsFillPencilFill></BsFillPencilFill>
				</Button>
				<Button variant='danger' onClick={() => console.log('Eliminar')}>
					<BsFillPersonXFill></BsFillPersonXFill>
				</Button> */}
			</TraineeInfo>
		</li>
	);
};

const TraineeList = ({ trainees, onClickTrainee, currentDay }) => {
	let currentDayFormat = '';
	if (currentDay && typeof currentDay === 'object') {
		currentDayFormat = `${currentDay.getDate()}/${
			currentDay.getMonth() + 1
		}/${currentDay.getFullYear()}`;
		trainees = trainees.filter(({ date }) => date === currentDayFormat);
	}

	return (
		<div className='mt-3'>
			{currentDayFormat ? 'TraineeList Filtered' : 'TraineeList'}
			<ul>
				{trainees.length !== 0 ? (
					trainees.map((trainee) => renderTrainee(onClickTrainee, trainee))
				) : (
					<p className='text-danger'>No se han encontrado alumnos</p>
				)}
			</ul>
		</div>
	);
};

TraineeList.propTypes = {
	trainees: PropTypes.array.isRequired,
	onClickTrainee: PropTypes.func.isRequired,
	currentDay: PropTypes.any,
};

export default TraineeList;
