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
var PlayerBlindActions = ["blind", "straddle"];
var PlayerCloseActions = ["check", "call", "fold"];
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
var isPlayerOption = (option) => {
  return PlayerOptionSchema.safeParse(option).success;
};
var isPlayerOptions = (options) => {
  return z2.array(PlayerOptionSchema).safeParse(options).success;
};
var isDealerOption = (option) => {
  return DealerOptionSchema.safeParse(option).success;
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
export {
  ActionSchema,
  DealerActionSchema,
  DealerOptionSchema,
  NextOptionSchema,
  PlayerActionsSchema,
  PlayerBetSchema,
  PlayerBlindActions,
  PlayerBlindSchema,
  PlayerCallSchema,
  PlayerCheckSchema,
  PlayerCloseActions,
  PlayerFoldSchema,
  PlayerOptionBetSchema,
  PlayerOptionBlindSchema,
  PlayerOptionCallSchema,
  PlayerOptionCheckSchema,
  PlayerOptionFoldSchema,
  PlayerOptionSchema,
  PlayerOptionStraddleSchema,
  PlayerStraddleSchema,
  PokerRounds,
  getNextRoundOption,
  increaseWagerAction,
  isDealerAction,
  isDealerOption,
  isDealerOptions,
  isPlayerAction,
  isPlayerOption,
  isPlayerOptions,
  optionArrayToString
};
//# sourceMappingURL=action.js.map