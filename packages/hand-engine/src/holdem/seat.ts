import { type GameStateType } from './state.js';

export let didSeatStraddle = (state: GameStateType, seatIndex: number) => {
	return (
		state.actionList.filter((action) => {
			return action.action === 'straddle' && action.seat === seatIndex;
		}).length > 0
	);
};

export let isSeatBlind = (state: GameStateType, seatIndex: number) => {
	return (
		state.actionList.filter((action) => {
			return action.action === 'blind' && action.seat === seatIndex;
		}).length > 0
	);
};

export let getNumberBlinds = (state: GameStateType) => {
	return state.actionList.filter((action) => {
		return action.action === 'blind';
	}).length;
};

export let getPositionName = (state: GameStateType, seatIndex: number) => {
	let posName = '';

	if (isSeatBlind(state, seatIndex)) {
		if (posName === '') posName += 'blind';
		else posName += '/blind';
	}

	return posName;
};
