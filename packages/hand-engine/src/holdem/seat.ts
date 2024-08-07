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

export type PositionNameType = {
	longName: string;
	shortName: string;
};

export let getPositionNames = (state: GameStateType): PositionNameType[] => {
	let numSeats = state.players.length;
	let posNames: PositionNameType[] = new Array(numSeats).fill({
		longName: '',
		shortName: '',
	});

	// Button is always the last seat
	posNames[numSeats - 1] = { longName: 'Button', shortName: 'BTN' };

	// get blinds/Straddles in first
	let numBlinds = 0;
	state.actionList.forEach((action) => {
		if (action.action === 'blind') {
			posNames[action.seat] = { longName: 'Blind', shortName: 'BL' };
			numBlinds++;
		}
		if (action.action === 'straddle') {
			posNames[action.seat] = { longName: 'Straddle', shortName: 'ST' };
		}
	});

	// rename blinds to corrospond to the number of blinds
	if (numBlinds > 1) {
		let blindCounter = 1;
		for (let i = 0; i < numSeats; i++) {
			if (posNames[i].longName === 'Blind') {
				if (blindCounter === 1) {
					posNames[i] = { longName: 'Small Blind', shortName: 'SB' };
				} else if (blindCounter === 2) {
					posNames[i] = { longName: 'Big Blind', shortName: 'BB' };
				} else {
					posNames[i] = {
						longName: `${blindCounter} Blind`,
						shortName: `${blindCounter}B`,
					};
				}
				blindCounter++;
			}
		}
	}

	//if there is any more seats than blinds and button
	let middleSeatNums = numSeats - numBlinds - 1;

	if (middleSeatNums <= 0) {
		return posNames;
	}

	// get the rest of the positions

	// UTG First
	if (posNames[numBlinds].longName === '') {
		posNames[numBlinds] = { longName: 'Under the Gun', shortName: 'UTG' };
	}

	// CO
	if (posNames[numSeats - 2].longName === '') {
		posNames[numSeats - 2] = { longName: 'Cutoff', shortName: 'CO' };
	}

	// HJ
	if (posNames[numSeats - 3].longName === '') {
		posNames[numSeats - 3] = { longName: 'High Jack', shortName: 'HJ' };
	}

	// LJ
	if (posNames[numSeats - 4].longName === '') {
		posNames[numSeats - 4] = { longName: 'Low Jack', shortName: 'LJ' };
	}

	// count remaining un-named seats
	let remainingSeats = posNames.filter((pos) => pos.longName === '').length;
	if (remainingSeats === 1) {
		posNames[numBlinds + 1] = { longName: 'Middle Position', shortName: 'MP' };
	} else if (remainingSeats === 2) {
		posNames[numBlinds + 1] = { longName: 'Middle Position', shortName: 'MP' };
		posNames[numBlinds + 2] = {
			longName: 'Middle Position + 1',
			shortName: 'MP1',
		};
	} else if (remainingSeats === 3) {
		posNames[numBlinds + 1] = {
			longName: 'Under the Gun + 1',
			shortName: 'UTG1',
		};
		posNames[numBlinds + 2] = { longName: 'Middle Position', shortName: 'MP' };
		posNames[numBlinds + 3] = {
			longName: 'Middle Position + 1',
			shortName: 'MP1',
		};
	}

	return posNames;
};

export let getPositionName = (state: GameStateType, seatIndex: number) => {
	return getPositionNames(state)[seatIndex];
};
