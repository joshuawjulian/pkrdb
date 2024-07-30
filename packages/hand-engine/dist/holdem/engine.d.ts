import { NextOptionType } from './action.js';
import { GameStateType } from './state.js';
import 'zod';

declare let next: (state: GameStateType) => NextOptionType[];

export { next };
