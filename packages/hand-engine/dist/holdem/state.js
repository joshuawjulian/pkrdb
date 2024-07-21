import { z } from 'zod';
import { ActionSchema, PokerRounds, isDealerAction, } from './action';
import { CardSchema } from './card';
import { getWagers } from './engineUtils';
export const OptionsSchema = z.object({
    reopenPercent: z.number().default(1.0),
});
export const StackSchema = z.union([
    z.number().positive(),
    z.literal('unknown'),
]);
export const GameStateSchema = z.object({
    options: OptionsSchema.default({}),
    actionList: ActionSchema.array(),
    players: z
        .object({
        startingStack: StackSchema,
        cards: CardSchema.array().length(2),
    })
        .array()
        .min(2),
});
export const stateAtIndex = (state, index) => {
    if (index < 0 || index > state.actionList.length)
        throw 'Invalid index';
    let newState = { ...state };
    newState.actionList = state.actionList.slice(0, index);
    return newState;
};
export const wageredEachRound = (state) => {
    let wagered = {};
    for (let seat = 0; seat < state.players.length; seat++) {
        wagered[seat] = {};
        for (let round of PokerRounds) {
            wagered[seat][round] = 0;
        }
    }
    let currRound = 'preflop';
    for (let i = 0; i < state.actionList.length; i++) {
        const currAction = state.actionList[i];
        if (currAction.action === 'showdown')
            break;
        if (isDealerAction(currAction)) {
            currRound = currAction.action;
            continue;
        }
        if (currAction.action === 'fold' || currAction.action === 'check')
            continue;
        wagered[currAction.seat][currRound] = currAction.amount;
    }
    return wagered;
};
export const remainingStackSize = (state) => {
    let remainingStack = {};
    state.players.forEach((player, index) => {
        remainingStack[index] = player.startingStack;
    });
    let wagered = wageredEachRound(state);
    for (let seat = 0; seat < state.players.length; seat++) {
        let stack = remainingStack[seat];
        if (stack === 'unknown')
            continue;
        let totalForSeat = 0;
        for (let round of PokerRounds) {
            totalForSeat += wagered[seat][round];
        }
        remainingStack[seat] = stack - totalForSeat;
    }
    return remainingStack;
};
export const rotateArray = (arr, count) => {
    return [...arr.slice(count), ...arr.slice(0, count)];
};
export const nextSeat = (seats) => {
    let updatedSeats = rotateArray(seats, 1);
    console.log('nextSeat() | ' + seats + ' -> ' + updatedSeats);
    return updatedSeats;
};
export let getRoundIndicies = (state) => {
    let roundIndicies = {
        preflop: -1,
        flop: -1,
        turn: -1,
        river: -1,
    };
    for (let i = state.actionList.length - 1; i >= 0; i--) {
        let currAction = state.actionList[i];
        if (isDealerAction(currAction)) {
            roundIndicies[currAction.action] = i;
        }
    }
    return roundIndicies;
};
export const toString = (state) => {
    let str = '';
    for (let i = 0; i < state.actionList.length; i++) {
        const action = state.actionList[i];
        if (isDealerAction(action)) {
            str += action.action + '\n';
        }
        else {
            str += action.seat + ' ' + action.action + ' ';
            if ('amount' in action)
                str = str + action.amount;
            str = str + '\n';
        }
    }
    return str;
};
export let actionListToString = (state) => {
    let str = '';
    for (let i = 0; i < state.actionList.length; i++) {
        const action = state.actionList[i];
        if (isDealerAction(action)) {
            str += `${action.action} `;
        }
        else {
            str += `[${action.seat}]${action.action} `;
            if ('amount' in action)
                str = str + action.amount;
        }
        str += ` | `;
    }
    return str;
};
export let getBets = (state) => {
    let wagers = getWagers(state);
    let bets = [];
    wagers.forEach((action) => {
        if (action.action === 'bet') {
            bets.push(action);
        }
    });
    return bets;
};
export let getBlindsStraddles = (state) => {
    let wagers = getWagers(state);
    let blindsStraddles = [];
    wagers.forEach((action) => {
        if (action.action === 'blind' || action.action === 'straddle') {
            blindsStraddles.push(action);
        }
    });
    return blindsStraddles;
};
