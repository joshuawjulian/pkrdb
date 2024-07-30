// src/holdem/state.ts
import { z as z3 } from "zod";

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
var isDealerAction = (action) => {
  return DealerActionSchema.safeParse(action).success;
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
var getWagers = (state) => {
  let playerActions = playerActionsCurrentRound(state);
  let wagers = [];
  for (let i = 0; i < playerActions.length; i++) {
    let action = playerActions[i];
    if (increaseWagerAction(action)) wagers.push(action);
  }
  return wagers;
};

// src/holdem/state.ts
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
var stateAtIndex = (state, index) => {
  if (index < 0 || index > state.actionList.length) throw "Invalid index";
  let newState = { ...state };
  newState.actionList = state.actionList.slice(0, index);
  return newState;
};
var wageredEachRound = (state) => {
  let wagered = {};
  for (let seat = 0; seat < state.players.length; seat++) {
    wagered[seat] = {};
    for (let round of PokerRounds) {
      wagered[seat][round] = 0;
    }
  }
  let currRound = "preflop";
  for (let i = 0; i < state.actionList.length; i++) {
    const currAction = state.actionList[i];
    if (currAction.action === "showdown") break;
    if (isDealerAction(currAction)) {
      currRound = currAction.action;
      continue;
    }
    if (currAction.action === "fold" || currAction.action === "check") continue;
    wagered[currAction.seat][currRound] = currAction.amount;
  }
  return wagered;
};
var remainingStackSize = (state) => {
  let remainingStack = {};
  state.players.forEach((player, index) => {
    remainingStack[index] = player.startingStack;
  });
  let wagered = wageredEachRound(state);
  for (let seat = 0; seat < state.players.length; seat++) {
    let stack = remainingStack[seat];
    if (stack === "unknown") continue;
    let totalForSeat = 0;
    for (let round of PokerRounds) {
      totalForSeat += wagered[seat][round];
    }
    remainingStack[seat] = stack - totalForSeat;
  }
  return remainingStack;
};
var rotateArray = (arr, count) => {
  return [...arr.slice(count), ...arr.slice(0, count)];
};
var nextSeat = (seats) => {
  let updatedSeats = rotateArray(seats, 1);
  console.log("nextSeat() | " + seats + " -> " + updatedSeats);
  return updatedSeats;
};
var getRoundIndicies = (state) => {
  let roundIndicies = {
    preflop: -1,
    flop: -1,
    turn: -1,
    river: -1
  };
  for (let i = state.actionList.length - 1; i >= 0; i--) {
    let currAction = state.actionList[i];
    if (isDealerAction(currAction)) {
      roundIndicies[currAction.action] = i;
    }
  }
  return roundIndicies;
};
var toString = (state) => {
  let str = "";
  for (let i = 0; i < state.actionList.length; i++) {
    const action = state.actionList[i];
    if (isDealerAction(action)) {
      str += action.action + "\n";
    } else {
      str += action.seat + " " + action.action + " ";
      if ("amount" in action) str = str + action.amount;
      str = str + "\n";
    }
  }
  return str;
};
var actionListToString = (state) => {
  let str = "";
  for (let i = 0; i < state.actionList.length; i++) {
    const action = state.actionList[i];
    if (isDealerAction(action)) {
      str += `${action.action} `;
    } else {
      str += `[${action.seat}]${action.action} `;
      if ("amount" in action) str = str + action.amount;
    }
    str += ` | `;
  }
  return str;
};
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
export {
  GameStateSchema,
  OptionsSchema,
  StackSchema,
  actionListToString,
  getBets,
  getBlindsStraddles,
  getRoundIndicies,
  nextSeat,
  remainingStackSize,
  rotateArray,
  stateAtIndex,
  toString,
  wageredEachRound
};
//# sourceMappingURL=state.js.map