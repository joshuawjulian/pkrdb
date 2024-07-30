// src/holdem/action.ts
import { z as z2 } from "zod";

// src/holdem/card.ts
import { z } from "zod";
var CardRankSchema = z.union([
  z.literal("2"),
  z.literal("3"),
  z.literal("4"),
  z.literal("5"),
  z.literal("6"),
  z.literal("7"),
  z.literal("8"),
  z.literal("9"),
  z.literal("T"),
  z.literal("J"),
  z.literal("Q"),
  z.literal("K"),
  z.literal("A"),
  z.literal("X")
]);
var CardSuitSchema = z.union([
  z.literal("s"),
  z.literal("h"),
  z.literal("d"),
  z.literal("c"),
  z.literal("x")
]);
var CardSchema = z.object({
  rank: CardRankSchema,
  suit: CardSuitSchema
});

// src/holdem/action.ts
var PlayerFoldSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("fold")
});
var PlayerCallSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("call"),
  amount: z2.number(),
  isAllIn: z2.boolean()
});
var PlayerBetSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("bet"),
  amount: z2.number(),
  isAllIn: z2.boolean()
});
var PlayerCheckSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("check")
});
var PlayerBlindSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("blind"),
  amount: z2.number(),
  isAllIn: z2.boolean()
});
var PlayerStraddleSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("straddle"),
  amount: z2.number(),
  isAllIn: z2.boolean()
});
var increaseWagerAction = (action) => {
  return action.action === "bet" || action.action === "blind" || action.action === "straddle";
};
var PlayerActionsSchema = z2.discriminatedUnion("action", [
  PlayerBetSchema,
  PlayerBlindSchema,
  PlayerCallSchema,
  PlayerCheckSchema,
  PlayerFoldSchema,
  PlayerStraddleSchema
]);
var DealerActionSchema = z2.discriminatedUnion("action", [
  z2.object({
    action: z2.literal("preflop")
  }),
  z2.object({
    action: z2.literal("flop"),
    flop: z2.array(CardSchema).length(3)
  }),
  z2.object({
    action: z2.literal("turn"),
    turn: CardSchema
  }),
  z2.object({
    action: z2.literal("river"),
    river: CardSchema
  }),
  z2.object({
    action: z2.literal("showdown")
  })
]);
var ActionSchema = z2.discriminatedUnion("action", [
  ...PlayerActionsSchema.options,
  ...DealerActionSchema.options
]);
var PlayerOptionFoldSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("fold")
});
var PlayerOptionBlindSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("blind")
});
var PlayerOptionStraddleSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("straddle")
});
var PlayerOptionCallSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("call"),
  amount: z2.number(),
  isAllIn: z2.boolean()
});
var PlayerOptionBetSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("bet"),
  min: z2.union([z2.number().min(0), z2.literal("unknown")]),
  max: z2.union([z2.number().min(0), z2.literal("unknown")])
});
var PlayerOptionCheckSchema = z2.object({
  seat: z2.number(),
  action: z2.literal("check")
});
var PlayerOptionSchema = z2.discriminatedUnion("action", [
  PlayerOptionFoldSchema,
  PlayerOptionCallSchema,
  PlayerOptionBetSchema,
  PlayerOptionCheckSchema,
  PlayerOptionBlindSchema,
  PlayerOptionStraddleSchema
]);
var DealerOptionSchema = z2.discriminatedUnion("action", [
  z2.object({
    action: z2.literal("preflop")
  }),
  z2.object({
    action: z2.literal("flop"),
    cards: z2.literal(3)
  }),
  z2.object({
    action: z2.literal("turn"),
    cards: z2.literal(1)
  }),
  z2.object({
    action: z2.literal("river"),
    cards: z2.literal(1)
  }),
  z2.object({
    action: z2.literal("showdown")
  })
]);
var PokerRounds = ["preflop", "flop", "turn", "river"];
var NextOptionSchema = z2.discriminatedUnion("action", [
  ...PlayerOptionSchema.options,
  ...DealerOptionSchema.options
]);
var isPlayerAction = (action) => {
  return PlayerActionsSchema.safeParse(action).success;
};
var isDealerAction = (action) => {
  return DealerActionSchema.safeParse(action).success;
};
var isPlayerOptions = (options) => {
  return z2.array(PlayerOptionSchema).safeParse(options).success;
};
var isDealerOptions = (options) => {
  return z2.array(DealerOptionSchema).safeParse(options).success;
};
var getNextRoundOption = (round) => {
  if (round === "preflop") {
    return { action: "flop", cards: 3 };
  } else if (round === "flop") {
    return { action: "turn", cards: 1 };
  } else if (round === "turn") {
    return { action: "river", cards: 1 };
  } else {
    return { action: "showdown" };
  }
};
var optionArrayToString = (options) => {
  return options.reduce(
    (acc, option) => [...acc, option.action],
    new Array()
  );
};

// src/holdem/state.ts
import { z as z3 } from "zod";
var OptionsSchema = z3.object({
  reopenPercent: z3.number().default(1)
});
var StackSchema = z3.union([
  z3.number().positive(),
  z3.literal("unknown")
]);
var GameStateSchema = z3.object({
  options: OptionsSchema.default({}),
  actionList: ActionSchema.array(),
  players: z3.object({
    startingStack: StackSchema,
    cards: CardSchema.array().length(2)
  }).array().min(2)
});
var getBets = (state) => {
  let wagers = getWagers(state);
  let bets = [];
  wagers.forEach((action) => {
    if (action.action === "bet") {
      bets.push(action);
    }
  });
  return bets;
};
var getBlindsStraddles = (state) => {
  let wagers = getWagers(state);
  let blindsStraddles = [];
  wagers.forEach((action) => {
    if (action.action === "blind" || action.action === "straddle") {
      blindsStraddles.push(action);
    }
  });
  return blindsStraddles;
};

// src/holdem/engine.ts
var next = (state) => {
  let optionList = [];
  const parse = GameStateSchema.safeParse(state);
  if (!parse.success) {
    throw parse.error.errors[0].message;
  }
  state = parse.data;
  if (state.actionList.length === 0) {
    return [{ action: "preflop" }];
  }
  let lastAction = state.actionList[state.actionList.length - 1];
  if (lastAction.action === "showdown") throw "Game is over";
  let currentRound = getCurrentRound(state);
  if (actionComplete(state)) return [getNextRoundOption(currentRound)];
  let playerActions = playerActionsCurrentRound(state);
  let seatOrder = getSeatOrder(state);
  let wagers = getWagers(state);
  let currSeat = seatOrder[0];
  let stacksBehind = getStacksAtStartOfCurrentRound(state);
  let largestRemainingStackBehind = Math.max(
    ...stacksBehind.filter((stack) => stack !== "unknown")
  );
  let adjustedRemainingStacksBehind = [];
  for (let i = 0; i < stacksBehind.length; i++) {
    let stack = stacksBehind[i];
    if (stack === "unknown") {
      adjustedRemainingStacksBehind.push(largestRemainingStackBehind);
    } else {
      adjustedRemainingStacksBehind.push(stack);
    }
  }
  let remainingStackBehind = adjustedRemainingStacksBehind[currSeat];
  let [minBet, maxBet] = getMinMaxBet(state);
  if (state.actionList.length === 1) {
    optionList.push({ action: "blind", seat: currSeat });
    return optionList;
  }
  optionList.push({ action: "fold", seat: currSeat });
  if (wagers.length === 0) {
    optionList.push({ action: "check", seat: currSeat });
  } else {
    if (currentRound === "preflop") {
      let lastWager = wagers[wagers.length - 1];
      if (lastWager.action === "blind" || lastWager.action === "straddle") {
        if (lastWager.seat === currSeat)
          optionList.push({ action: "check", seat: currSeat });
      }
    }
  }
  if (wagers.length === 0) {
    optionList.push({
      action: "bet",
      seat: currSeat,
      min: minBet,
      max: maxBet
    });
  }
  if (wagers.length > 0) {
    let largestWagerAction = getLargestWager(state);
    let largestWagerAmount = getLargestWagerAmount(state);
    if (currentRound !== "preflop" || largestWagerAction !== null && currSeat !== largestWagerAction.seat) {
      if (largestWagerAmount >= remainingStackBehind) {
        optionList.push({
          action: "call",
          seat: currSeat,
          amount: remainingStackBehind,
          isAllIn: true
        });
      } else {
        optionList.push({
          action: "call",
          seat: currSeat,
          amount: largestWagerAmount,
          isAllIn: false
        });
      }
    }
    if (largestWagerAmount < remainingStackBehind) {
      let hasPlayerActed = playerActions.find((action) => {
        return action.seat === currSeat && action.action !== "blind" && action.action !== "straddle";
      });
      if (!hasPlayerActed) {
        optionList.push({
          action: "bet",
          seat: currSeat,
          min: minBet,
          max: maxBet
        });
      } else {
        let reopenPercent = state.options.reopenPercent;
        let seatActionIdx = playerActions.findLastIndex(
          (action) => "seat" in action && action.seat === currSeat
        );
        let smallBet = "amount" in playerActions[seatActionIdx] ? playerActions[seatActionIdx].amount : 0;
        for (let i = seatActionIdx + 1; i < playerActions.length; i++) {
          let playerAction = playerActions[i];
          if (playerAction.action === "bet") {
            let largeBet = playerAction.amount;
            if (largeBet > smallBet + reopenPercent * smallBet) {
              optionList.push({
                action: "bet",
                seat: currSeat,
                min: minBet,
                // this might be wrong, but Jordan has me too tired to think through it
                max: maxBet
              });
            }
          }
        }
      }
    }
  }
  if (currentRound === "preflop") {
    if (!hasNonBlindAction(state)) {
      optionList.push({ action: "blind", seat: currSeat });
      optionList.push({ action: "straddle", seat: currSeat });
    } else if (!hasNonBlindStraddleAction(state)) {
      optionList.push({ action: "straddle", seat: currSeat });
    }
  }
  return optionList;
};

// src/holdem/engineUtils.ts
var playerActionsCurrentRound = (state) => {
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
var getCurrentRound = (state) => {
  let dealerActions = getAllDealerActions(state);
  if (dealerActions.length === 0) throw "No dealer actions found";
  if (dealerActions[dealerActions.length - 1].action === "showdown")
    throw "Game is over";
  return dealerActions[dealerActions.length - 1].action;
};
var getAllDealerActions = (state) => {
  let dealerActions = [];
  for (let i = 0; i < state.actionList.length; i++) {
    let currAction = state.actionList[i];
    if (isDealerAction(currAction)) {
      dealerActions.push(currAction);
    }
  }
  if (dealerActions.length === 0) throw "No dealer actions found";
  return dealerActions;
};
var getIndexOfRoundStart = (state, round) => {
  for (let i = state.actionList.length - 1; i >= 0; i--) {
    let currAction = state.actionList[i];
    if (isDealerAction(currAction) && currAction.action === round) {
      return i;
    }
  }
  return -1;
};
var getSeatsAtThisRoundStart = (state) => {
  let currentRound = getCurrentRound(state);
  return getSeatsAtRoundStart(state, currentRound);
};
var getSeatsAtRoundStart = (state, round) => {
  let seats = [...Array(state.players.length).keys()];
  let idxRoundStart = getIndexOfRoundStart(state, round);
  for (let i = 0; i < idxRoundStart; i++) {
    let action = state.actionList[i];
    if (isPlayerAction(action) && (action.action === "fold" || "isAllIn" in action && action.isAllIn)) {
      seats = seats.filter((seat) => seat !== action.seat);
    }
  }
  return seats;
};
var cycleSeats = (seats) => {
  if (seats.length > 1) return [...seats.slice(1), seats[0]];
  return seats;
};
var findLargestBlind = (state) => {
  return state.actionList.reduce((acc, curr) => {
    if (curr.action === "blind" && curr.amount > acc) return curr.amount;
    return acc;
  }, 0);
};
var largestWagersByRound = (state) => {
  let emptyWager = [...Array(state.players.length).keys()].map(() => 0);
  let wagers = {
    preflop: [...emptyWager],
    flop: [...emptyWager],
    turn: [...emptyWager],
    river: [...emptyWager]
  };
  let currRound;
  state.actionList.forEach((action, idx) => {
    if (isDealerAction(action)) {
      currRound = action.action;
      return;
    }
    if (isPlayerAction(action)) {
      if ("amount" in action && wagers[currRound][action.seat] < action.amount) {
        wagers[currRound][action.seat] = action.amount;
      }
    }
  });
  return wagers;
};
var getStacksAtStartOfRound = (state) => {
  let startingStacks = [];
  state.players.forEach((player) => {
    startingStacks.push(player.startingStack);
  });
  let stacks = {
    preflop: structuredClone(startingStacks),
    flop: structuredClone(startingStacks),
    turn: structuredClone(startingStacks),
    river: structuredClone(startingStacks)
  };
  let largestWagers = largestWagersByRound(state);
  for (let seat = 0; seat < state.players.length; seat++) {
    let seatTotal = 0;
    PokerRounds.forEach((round) => {
      let startingStack = stacks["preflop"][seat];
      if (startingStack === "unknown") return;
      if (round === "preflop") {
        seatTotal = largestWagers[round][seat];
        return;
      }
      stacks[round][seat] = startingStack - seatTotal;
      seatTotal += largestWagers[round][seat];
    });
  }
  return stacks;
};
var getStacksAtStartOfCurrentRound = (state) => {
  return getStacksAtStartOfRound(state)[getCurrentRound(state)];
};
var getStacks = (state) => {
  let largestWagers = largestWagersByRound(state);
  let stacks = [];
  state.players.forEach((player) => {
    stacks.push(player.startingStack);
  });
  PokerRounds.forEach((round) => {
    let numPlayers = state.players.length;
    for (let seat = 0; seat < numPlayers; seat++) {
      let currStack = stacks[seat];
      if (currStack !== "unknown")
        stacks[seat] = currStack - largestWagers[round][seat];
    }
  });
  return stacks;
};
var getSeatOrder = (state) => {
  let playerActions = playerActionsCurrentRound(state);
  let seatsOrder = getSeatsAtThisRoundStart(state);
  for (let i = 0; i < playerActions.length; i++) {
    let action = playerActions[i];
    if (action.action === "fold") {
      seatsOrder = seatsOrder.filter((seat) => seat !== action.seat);
      continue;
    }
    if ("isAllIn" in action && action.isAllIn) {
      seatsOrder = seatsOrder.filter((seat) => seat !== action.seat);
      continue;
    }
    seatsOrder = cycleSeats(seatsOrder);
  }
  return seatsOrder;
};
var getWagers = (state) => {
  let playerActions = playerActionsCurrentRound(state);
  let wagers = [];
  for (let i = 0; i < playerActions.length; i++) {
    let action = playerActions[i];
    if (increaseWagerAction(action)) wagers.push(action);
  }
  return wagers;
};
var getLargestWagers = (state) => {
  let largestWagers = [...Array(state.players.length).keys()].map(() => 0);
  let wagers = getWagers(state);
  wagers.forEach((wager) => {
    if (wager.amount > largestWagers[wager.seat]) {
      largestWagers[wager.seat] = wager.amount;
    }
  });
  return largestWagers;
};
var getLargestWager = (state) => {
  let wagers = getWagers(state);
  if (wagers.length === 0) return null;
  return wagers.reduce((acc, curr) => {
    if (curr.amount > acc.amount) return curr;
    return acc;
  });
};
var getLargestWagerAmount = (state) => {
  return getLargestWager(state)?.amount ?? 0;
};
var getRemainingStacks = (state) => {
  let currRound = getCurrentRound(state);
  let stacksAtStart = getStacksAtStartOfRound(state)[currRound];
  let largestWager = getLargestWagers(state);
  let numPlayers = state.players.length;
  let remainingStacks = [...stacksAtStart];
  for (let seat = 0; seat < numPlayers; seat++) {
    let currStartStack = stacksAtStart[seat];
    if (currStartStack !== "unknown")
      remainingStacks[seat] = currStartStack - largestWager[seat];
  }
  return remainingStacks;
};
var getMinBet = (state) => {
  let minBet = 0;
  let wagers = getWagers(state);
  let currSeat = getSeatOrder(state).at(0);
  if (currSeat === void 0) throw "No seats found";
  let largestBlind = findLargestBlind(state);
  minBet = largestBlind;
  let reopenWagers = [];
  if (wagers.length > 1) {
    for (let i = 0; i < wagers.length; i++) {
      if (wagers[i].isAllIn) {
        if (reopenWagers.length > 1) {
          let largeBet = reopenWagers[reopenWagers.length - 1].amount;
          let smallBet = reopenWagers[reopenWagers.length - 2].amount;
          let wagerStep = largeBet - smallBet;
          if (wagers[i].amount >= largeBet + wagerStep) {
            reopenWagers.push(wagers[i]);
          }
        }
        if (reopenWagers.length === 1) {
          reopenWagers.push(wagers[i]);
        }
      } else {
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
var getLargestStack = (state) => {
  let stacks = getStacksAtStartOfCurrentRound(state);
  let largestStack = 0;
  for (let i = 0; i < stacks.length; i++) {
    let currStack = stacks[i];
    if (currStack !== "unknown" && currStack > largestStack) {
      largestStack = currStack;
    }
  }
  return largestStack;
};
var getMaxBet = (state) => {
  let currSeat = getSeatOrder(state).at(0);
  if (currSeat === void 0) throw "No seats found";
  let maxBet = getRemainingStacks(state).at(currSeat);
  if (maxBet === void 0) throw "No stack found";
  if (maxBet === "unknown") return getLargestStack(state);
  return maxBet;
};
var getMinMaxBet = (state) => {
  let minBet = getMinBet(state);
  let maxBet = getMaxBet(state);
  if (minBet > maxBet) return [maxBet, maxBet];
  return [minBet, maxBet];
};
var hasNonBlindAction = (state) => {
  return state.actionList.filter(
    (a) => a.action !== "blind" && a.action !== "preflop"
  ).length > 0;
};
var hasNonBlindStraddleAction = (state) => {
  return state.actionList.filter(
    (a) => a.action !== "blind" && a.action !== "straddle" && a.action !== "preflop"
  ).length > 0;
};
var actionComplete = (state) => {
  if (state.actionList.length <= 1) return false;
  let playerActions = playerActionsCurrentRound(state);
  let seats = getSeatsAtThisRoundStart(state);
  let largestWager = getLargestWagerAmount(state);
  if (largestWager === 0 && getBlindsStraddles(state).length === 0) {
    return playerActions.length < seats.length;
  }
  if (getCurrentRound(state) === "preflop" && getBets(state).length === 0) {
    return playerActions.length === seats.length + getBlindsStraddles(state).length;
  }
  let seatsToAct = structuredClone(seats);
  let largestBetAction = null;
  for (let i = 0; i < playerActions.length; i++) {
    let currAction = playerActions[i];
    if (currAction.action === "fold") {
      seatsToAct = seatsToAct.filter((seat) => seat !== currAction.seat);
      continue;
    }
    if (currAction.action === "bet") {
      if (largestBetAction === null || currAction.amount > largestBetAction.amount) {
        largestBetAction = currAction;
      }
    }
    seatsToAct = cycleSeats(seatsToAct);
  }
  return seatsToAct[0] === largestBetAction?.seat;
};
var numPlayersNotFolded = (state) => {
  let playerActions = playerActionsCurrentRound(state);
  let seats = getSeatsAtThisRoundStart(state);
  playerActions.forEach((action) => {
    if (action.action === "fold") {
      seats = seats.filter((seat) => seat !== action.seat);
    }
  });
  return seats.length;
};
var getSeatActions = (state) => {
  let playerActions = playerActionsCurrentRound(state);
  let seatActions = {};
  for (let i = 0; i < state.players.length; i++) seatActions[i] = [];
  playerActions.forEach((action) => {
    seatActions[action.seat].push(action);
  });
  return seatActions;
};
var validateAction = (state, nextAction) => {
  let options = next(state);
  if (options.length < 1)
    return `There are less than one options (${options.length})`;
  if (isDealerAction(nextAction) && isDealerOptions(options)) {
    if (options.length > 1) return "Dealer Options must only be length 1";
    if (options[0].action !== nextAction.action) {
      return `Dealer action '${nextAction.action}' does not match option '${options[0].action}'`;
    }
    return true;
  }
  if (isPlayerAction(nextAction) && isPlayerOptions(options)) {
    let option = options.find((o) => o.action === nextAction.action);
    if (option === void 0)
      return `nextAction ${nextAction.action} not in options ${optionArrayToString(options)}`;
    if (option.seat !== nextAction.seat)
      return `Seat ${nextAction.seat} does not match option seat ${option.seat}`;
    if (nextAction.action === "fold" || nextAction.action === "check" || nextAction.action === "straddle" || nextAction.action === "blind")
      return true;
    if (nextAction.action === "call" && option.action === "call") {
      if (nextAction.amount === option.amount) return true;
      return `Call amount ${nextAction.amount} does not match option amount ${option.amount}`;
    }
    if (nextAction.action === "bet" && option.action === "bet") {
      if (option.min === "unknown" || option.max === "unknown") return true;
      if (nextAction.amount >= option.min && nextAction.amount <= option.max)
        return true;
      return `Bet amount ${nextAction.amount} not in range ${option.min} - ${option.max}`;
    }
  }
  return "Something went wrong";
};
var validateState = (state) => {
  for (let i = 0; i < state.actionList.length; i++) {
    let prevState = structuredClone(state);
    prevState.actionList = state.actionList.slice(0, i);
    let nextAction = state.actionList[i];
    let valid = validateAction(prevState, nextAction);
    if (valid !== true) return `Invalid action at index ${i}: ${valid}`;
  }
  return true;
};
export {
  actionComplete,
  cycleSeats,
  findLargestBlind,
  getAllDealerActions,
  getCurrentRound,
  getIndexOfRoundStart,
  getLargestStack,
  getLargestWager,
  getLargestWagerAmount,
  getLargestWagers,
  getMaxBet,
  getMinBet,
  getMinMaxBet,
  getRemainingStacks,
  getSeatActions,
  getSeatOrder,
  getSeatsAtRoundStart,
  getSeatsAtThisRoundStart,
  getStacks,
  getStacksAtStartOfCurrentRound,
  getStacksAtStartOfRound,
  getWagers,
  hasNonBlindAction,
  hasNonBlindStraddleAction,
  largestWagersByRound,
  numPlayersNotFolded,
  playerActionsCurrentRound,
  validateAction,
  validateState
};
//# sourceMappingURL=engineUtils.js.map