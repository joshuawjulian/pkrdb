import { GameStateType } from './state.js';
import 'zod';
import './action.js';

declare let didSeatStraddle: (state: GameStateType, seatIndex: number) => boolean;
declare let isSeatBlind: (state: GameStateType, seatIndex: number) => boolean;
declare let getNumberBlinds: (state: GameStateType) => number;
type PositionNameType = {
    longName: string;
    shortName: string;
};
declare let getPositionNames: (state: GameStateType) => PositionNameType[];
declare let getPositionName: (state: GameStateType, seatIndex: number) => PositionNameType;

export { type PositionNameType, didSeatStraddle, getNumberBlinds, getPositionName, getPositionNames, isSeatBlind };
