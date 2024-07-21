import { PokerRounds, increaseWagerAction, isDealerAction, isDealerOptions, isPlayerAction, isPlayerOptions, } from './action';
import { next } from './engine';
import { getBets, getBlindsStraddles } from './state';
import { optionArrayToString } from './tests/testUtil';
export let playerActionsCurrentRound = (state) => {
    let currentRound = getCurrentRound(state);
    let idxStart = getIndexOfRoundStart(state, currentRound);
    let playerActions = [];
    for (let i = idxStart; i < state.actionList.length; i++) {
        let currAction = state.actionList[i];
        if (!isDealerAction(currAction)) {
            playerActions.push(currAction);
        }
    }
    return playerActions;
};
export let getCurrentRound = (state) => {
    let dealerActions = getAllDealerActions(state);
    if (dealerActions.length === 0)
        throw 'No dealer actions found';
    if (dealerActions[dealerActions.length - 1].action === 'showdown')
        throw 'Game is over';
    return dealerActions[dealerActions.length - 1].action;
};
export let getAllDealerActions = (state) => {
    let dealerActions = [];
    for (let i = 0; i < state.actionList.length; i++) {
        let currAction = state.actionList[i];
        if (isDealerAction(currAction)) {
            dealerActions.push(currAction);
        }
    }
    if (dealerActions.length === 0)
        throw 'No dealer actions found';
    return dealerActions;
};
export let getIndexOfRoundStart = (state, round) => {
    for (let i = state.actionList.length - 1; i >= 0; i--) {
        let currAction = state.actionList[i];
        if (isDealerAction(currAction) && currAction.action === round) {
            return i;
        }
    }
    return -1;
};
export let getSeatsAtThisRoundStart = (state) => {
    let currentRound = getCurrentRound(state);
    return getSeatsAtRoundStart(state, currentRound);
};
export let getSeatsAtRoundStart = (state, round) => {
    let seats = [...Array(state.players.length).keys()];
    let idxRoundStart = getIndexOfRoundStart(state, round);
    for (let i = 0; i < idxRoundStart; i++) {
        let action = state.actionList[i];
        if (isPlayerAction(action) &&
            (action.action === 'fold' || ('isAllIn' in action && action.isAllIn))) {
            seats = seats.filter((seat) => seat !== action.seat);
        }
    }
    return seats;
};
export let cycleSeats = (seats) => {
    if (seats.length > 1)
        return [...seats.slice(1), seats[0]];
    return seats;
};
export let findLargestBlind = (state) => {
    return state.actionList.reduce((acc, curr) => {
        if (curr.action === 'blind' && curr.amount > acc)
            return curr.amount;
        return acc;
    }, 0);
};
// This can be calls or allins just largest by seat per round
export let largestWagersByRound = (state) => {
    let emptyWager = [...Array(state.players.length).keys()].map(() => 0);
    let wagers = {
        preflop: [...emptyWager],
        flop: [...emptyWager],
        turn: [...emptyWager],
        river: [...emptyWager],
    };
    let currRound;
    state.actionList.forEach((action, idx) => {
        if (isDealerAction(action)) {
            currRound = action.action;
            return;
        }
        if (isPlayerAction(action)) {
            if ('amount' in action &&
                wagers[currRound][action.seat] < action.amount) {
                wagers[currRound][action.seat] = action.amount;
            }
        }
    });
    return wagers;
};
export let getStacksAtStartOfRound = (state) => {
    let startingStacks = [];
    state.players.forEach((player) => {
        startingStacks.push(player.startingStack);
    });
    let stacks = {
        preflop: structuredClone(startingStacks),
        flop: structuredClone(startingStacks),
        turn: structuredClone(startingStacks),
        river: structuredClone(startingStacks),
    };
    let largestWagers = largestWagersByRound(state);
    // go through each seat and by round get the largest wager additing it
    // to the seatTotal then subtracting it from the starting stack
    for (let seat = 0; seat < state.players.length; seat++) {
        let seatTotal = 0;
        PokerRounds.forEach((round) => {
            let startingStack = stacks['preflop'][seat];
            if (startingStack === 'unknown')
                return;
            if (round === 'preflop') {
                seatTotal = largestWagers[round][seat];
                return;
            }
            stacks[round][seat] = startingStack - seatTotal;
            seatTotal += largestWagers[round][seat];
        });
    }
    return stacks;
};
export let getStacksAtStartOfCurrentRound = (state) => {
    return getStacksAtStartOfRound(state)[getCurrentRound(state)];
};
export let getStacks = (state) => {
    let largestWagers = largestWagersByRound(state);
    let stacks = [];
    state.players.forEach((player) => {
        stacks.push(player.startingStack);
    });
    PokerRounds.forEach((round) => {
        let numPlayers = state.players.length;
        for (let seat = 0; seat < numPlayers; seat++) {
            let currStack = stacks[seat];
            if (currStack !== 'unknown')
                stacks[seat] = currStack - largestWagers[round][seat];
        }
    });
    return stacks;
};
// Returns seat order after last action
// only seats with action behind will be in the order
export let getSeatOrder = (state) => {
    let playerActions = playerActionsCurrentRound(state);
    let seatsOrder = getSeatsAtThisRoundStart(state);
    for (let i = 0; i < playerActions.length; i++) {
        let action = playerActions[i];
        if (action.action === 'fold') {
            seatsOrder = seatsOrder.filter((seat) => seat !== action.seat);
            continue;
        }
        if ('isAllIn' in action && action.isAllIn) {
            seatsOrder = seatsOrder.filter((seat) => seat !== action.seat);
            continue;
        }
        seatsOrder = cycleSeats(seatsOrder);
    }
    return seatsOrder;
};
// get all wagers for the current round (blinds/straddle/bets)
export let getWagers = (state) => {
    let playerActions = playerActionsCurrentRound(state);
    let wagers = [];
    for (let i = 0; i < playerActions.length; i++) {
        let action = playerActions[i];
        if (increaseWagerAction(action))
            wagers.push(action);
    }
    return wagers;
};
// returns an array where each seat index is the largest wager for this round
export let getLargestWagers = (state) => {
    let largestWagers = [...Array(state.players.length).keys()].map(() => 0);
    let wagers = getWagers(state);
    wagers.forEach((wager) => {
        if (wager.amount > largestWagers[wager.seat]) {
            largestWagers[wager.seat] = wager.amount;
        }
    });
    return largestWagers;
};
export let getLargestWager = (state) => {
    let wagers = getWagers(state);
    if (wagers.length === 0)
        return null;
    return wagers.reduce((acc, curr) => {
        if (curr.amount > acc.amount)
            return curr;
        return acc;
    });
};
export let getLargestWagerAmount = (state) => {
    return getLargestWager(state)?.amount ?? 0;
};
export let getRemainingStacks = (state) => {
    let currRound = getCurrentRound(state);
    let stacksAtStart = getStacksAtStartOfRound(state)[currRound];
    let largestWager = getLargestWagers(state);
    let numPlayers = state.players.length;
    let remainingStacks = [...stacksAtStart];
    for (let seat = 0; seat < numPlayers; seat++) {
        let currStartStack = stacksAtStart[seat];
        if (currStartStack !== 'unknown')
            remainingStacks[seat] = currStartStack - largestWager[seat];
    }
    return remainingStacks;
};
// Get the min viable bet for the current seat
// disregarding if they actually have the stack to do it
export let getMinBet = (state) => {
    let minBet = 0;
    let wagers = getWagers(state);
    let currSeat = getSeatOrder(state).at(0);
    if (currSeat === undefined)
        throw 'No seats found';
    let largestBlind = findLargestBlind(state);
    minBet = largestBlind;
    let reopenWagers = [];
    if (wagers.length > 1) {
        // figure which wagers reopened betting
        for (let i = 0; i < wagers.length; i++) {
            if (wagers[i].isAllIn) {
                // 2 or more previous reopen wagers this round
                if (reopenWagers.length > 1) {
                    let largeBet = reopenWagers[reopenWagers.length - 1].amount;
                    let smallBet = reopenWagers[reopenWagers.length - 2].amount;
                    let wagerStep = largeBet - smallBet;
                    if (wagers[i].amount >= largeBet + wagerStep) {
                        reopenWagers.push(wagers[i]);
                    }
                }
                // 1 open wagers this round
                if (reopenWagers.length === 1) {
                    reopenWagers.push(wagers[i]);
                }
            }
            else {
                reopenWagers.push(wagers[i]);
            }
        }
    }
    if (wagers.length === 1) {
        reopenWagers.push(wagers[0]);
    }
    if (reopenWagers.length === 0) {
        minBet = largestBlind;
    }
    if (reopenWagers.length === 1) {
        minBet = reopenWagers[0].amount * 2;
    }
    if (reopenWagers.length > 1) {
        let largeBet = reopenWagers[reopenWagers.length - 1].amount;
        let smallBet = reopenWagers[reopenWagers.length - 2].amount;
        let wagerStep = largeBet - smallBet;
        minBet = largeBet + wagerStep;
    }
    return minBet;
};
export let getLargestStack = (state) => {
    let stacks = getStacksAtStartOfCurrentRound(state);
    let largestStack = 0;
    for (let i = 0; i < stacks.length; i++) {
        let currStack = stacks[i];
        if (currStack !== 'unknown' && currStack > largestStack) {
            largestStack = currStack;
        }
    }
    return largestStack;
};
export let getMaxBet = (state) => {
    let currSeat = getSeatOrder(state).at(0);
    if (currSeat === undefined)
        throw 'No seats found';
    let maxBet = getRemainingStacks(state).at(currSeat);
    if (maxBet === undefined)
        throw 'No stack found';
    if (maxBet === 'unknown')
        return getLargestStack(state);
    return maxBet;
};
/*
    Get the min and max bet for the player with the current action
*/
export let getMinMaxBet = (state) => {
    let minBet = getMinBet(state);
    let maxBet = getMaxBet(state);
    // not able to make a full open
    if (minBet > maxBet)
        return [maxBet, maxBet];
    return [minBet, maxBet];
};
export let hasNonBlindAction = (state) => {
    return (state.actionList.filter((a) => a.action !== 'blind' && a.action !== 'preflop').length > 0);
};
export let hasNonBlindStraddleAction = (state) => {
    return (state.actionList.filter((a) => a.action !== 'blind' &&
        a.action !== 'straddle' &&
        a.action !== 'preflop').length > 0);
};
// Returns true if the current round is complete
// IE: The bets are not matched by all players/all checked
export let actionComplete = (state) => {
    if (state.actionList.length <= 1)
        return false;
    let playerActions = playerActionsCurrentRound(state);
    let seats = getSeatsAtThisRoundStart(state);
    let largestWager = getLargestWagerAmount(state);
    // no bets, ensure everyone has acted (checked or folded)
    // and it isnt preflop
    if (largestWager === 0 && getBlindsStraddles(state).length === 0) {
        return playerActions.length < seats.length;
    }
    //preflop blind/straddle edge case
    if (getCurrentRound(state) === 'preflop' && getBets(state).length === 0) {
        return (playerActions.length === seats.length + getBlindsStraddles(state).length);
    }
    // Here we know someone has bet
    // Now we need to check that everyone else has matched the bet with a call or folded
    let seatsToAct = structuredClone(seats);
    let largestBetAction = null;
    for (let i = 0; i < playerActions.length; i++) {
        let currAction = playerActions[i];
        if (currAction.action === 'fold') {
            seatsToAct = seatsToAct.filter((seat) => seat !== currAction.seat);
            continue;
        }
        if (currAction.action === 'bet') {
            if (largestBetAction === null ||
                currAction.amount > largestBetAction.amount) {
                largestBetAction = currAction;
            }
        }
        seatsToAct = cycleSeats(seatsToAct);
    }
    return seatsToAct[0] === largestBetAction?.seat;
};
export let numPlayersNotFolded = (state) => {
    let playerActions = playerActionsCurrentRound(state);
    let seats = getSeatsAtThisRoundStart(state);
    playerActions.forEach((action) => {
        if (action.action === 'fold') {
            seats = seats.filter((seat) => seat !== action.seat);
        }
    });
    return seats.length;
};
export let getSeatActions = (state) => {
    let playerActions = playerActionsCurrentRound(state);
    let seatActions = {};
    for (let i = 0; i < state.players.length; i++)
        seatActions[i] = [];
    playerActions.forEach((action) => {
        seatActions[action.seat].push(action);
    });
    return seatActions;
};
export let validateAction = (state, nextAction) => {
    let options = next(state);
    if (options.length < 1)
        return `There are less than one options (${options.length})`;
    if (isDealerAction(nextAction) && isDealerOptions(options)) {
        if (options.length > 1)
            return 'Dealer Options must only be length 1';
        if (options[0].action !== nextAction.action) {
            return `Dealer action '${nextAction.action}' does not match option '${options[0].action}'`;
        }
        return true;
    }
    if (isPlayerAction(nextAction) && isPlayerOptions(options)) {
        let option = options.find((o) => o.action === nextAction.action);
        if (option === undefined)
            return `nextAction ${nextAction.action} not in options ${optionArrayToString(options)}`;
        if (option.seat !== nextAction.seat)
            return `Seat ${nextAction.seat} does not match option seat ${option.seat}`;
        // fold, check, blind, straddle are valid on their own
        if (nextAction.action === 'fold' ||
            nextAction.action === 'check' ||
            nextAction.action === 'straddle' ||
            nextAction.action === 'blind')
            return true;
        // call
        if (nextAction.action === 'call' && option.action === 'call') {
            if (nextAction.amount === option.amount)
                return true;
            return `Call amount ${nextAction.amount} does not match option amount ${option.amount}`;
        }
        // bet
        if (nextAction.action === 'bet' && option.action === 'bet') {
            if (option.min === 'unknown' || option.max === 'unknown')
                return true;
            if (nextAction.amount >= option.min && nextAction.amount <= option.max)
                return true;
            return `Bet amount ${nextAction.amount} not in range ${option.min} - ${option.max}`;
        }
    }
    return 'Something went wrong';
};
export let validateState = (state) => {
    for (let i = 0; i < state.actionList.length; i++) {
        let prevState = structuredClone(state);
        prevState.actionList = state.actionList.slice(0, i);
        let nextAction = state.actionList[i];
        let valid = validateAction(prevState, nextAction);
        if (valid !== true)
            return `Invalid action at index ${i}: ${valid}`;
    }
    return true;
};
