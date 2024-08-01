import { describe, expect, it } from 'vitest';
import { getPositionName } from '../seat.js';
import { gameStateSimpleSetup } from './state.test.js';

describe('getPositionName', () => {
	it('should return blind', () => {
		expect(getPositionName(gameStateSimpleSetup, 0)).toEqual('blind');
	});
});
