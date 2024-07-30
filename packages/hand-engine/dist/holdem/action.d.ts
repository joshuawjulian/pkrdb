import { z } from 'zod';

declare const PlayerFoldSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "fold";
}, {
    seat: number;
    action: "fold";
}>;
type PlayerFoldType = z.infer<typeof PlayerFoldSchema>;
declare const PlayerCallSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}>;
type PlayerCallType = z.infer<typeof PlayerCallSchema>;
declare const PlayerBetSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "bet";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "bet";
    amount: number;
    isAllIn: boolean;
}>;
type PlayerBetType = z.infer<typeof PlayerBetSchema>;
declare const PlayerCheckSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "check";
}, {
    seat: number;
    action: "check";
}>;
type PlayerCheckType = z.infer<typeof PlayerCheckSchema>;
declare const PlayerBlindSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "blind";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "blind";
    amount: number;
    isAllIn: boolean;
}>;
type PlayerBlindType = z.infer<typeof PlayerBlindSchema>;
declare const PlayerStraddleSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "straddle";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "straddle";
    amount: number;
    isAllIn: boolean;
}>;
type PlayerStraddleType = z.infer<typeof PlayerStraddleSchema>;
type PlayerIncreaseWagerType = PlayerBetType | PlayerBlindType | PlayerStraddleType;
declare const increaseWagerAction: (action: ActionType) => action is PlayerIncreaseWagerType;
declare const PlayerActionsSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "bet";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "bet";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "blind";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "blind";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "check";
}, {
    seat: number;
    action: "check";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "fold";
}, {
    seat: number;
    action: "fold";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "straddle";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "straddle";
    amount: number;
    isAllIn: boolean;
}>]>;
declare const PlayerBlindActions: readonly ["blind", "straddle"];
declare const PlayerCloseActions: readonly ["check", "call", "fold"];
declare const DealerActionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    action: z.ZodLiteral<"preflop">;
}, "strip", z.ZodTypeAny, {
    action: "preflop";
}, {
    action: "preflop";
}>, z.ZodObject<{
    action: z.ZodLiteral<"flop">;
    flop: z.ZodArray<z.ZodObject<{
        rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
        suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
    }, "strip", z.ZodTypeAny, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    action: "flop";
    flop: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }[];
}, {
    action: "flop";
    flop: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }[];
}>, z.ZodObject<{
    action: z.ZodLiteral<"turn">;
    turn: z.ZodObject<{
        rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
        suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
    }, "strip", z.ZodTypeAny, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }>;
}, "strip", z.ZodTypeAny, {
    action: "turn";
    turn: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}, {
    action: "turn";
    turn: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}>, z.ZodObject<{
    action: z.ZodLiteral<"river">;
    river: z.ZodObject<{
        rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
        suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
    }, "strip", z.ZodTypeAny, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }>;
}, "strip", z.ZodTypeAny, {
    action: "river";
    river: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}, {
    action: "river";
    river: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}>, z.ZodObject<{
    action: z.ZodLiteral<"showdown">;
}, "strip", z.ZodTypeAny, {
    action: "showdown";
}, {
    action: "showdown";
}>]>;
type PlayerActionType = z.infer<typeof PlayerActionsSchema>;
type DealerActionType = z.infer<typeof DealerActionSchema>;
declare const ActionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "bet";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "bet";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "blind";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "blind";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "check";
}, {
    seat: number;
    action: "check";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "fold";
}, {
    seat: number;
    action: "fold";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "straddle";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "straddle";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    action: z.ZodLiteral<"preflop">;
}, "strip", z.ZodTypeAny, {
    action: "preflop";
}, {
    action: "preflop";
}>, z.ZodObject<{
    action: z.ZodLiteral<"flop">;
    flop: z.ZodArray<z.ZodObject<{
        rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
        suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
    }, "strip", z.ZodTypeAny, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    action: "flop";
    flop: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }[];
}, {
    action: "flop";
    flop: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }[];
}>, z.ZodObject<{
    action: z.ZodLiteral<"turn">;
    turn: z.ZodObject<{
        rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
        suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
    }, "strip", z.ZodTypeAny, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }>;
}, "strip", z.ZodTypeAny, {
    action: "turn";
    turn: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}, {
    action: "turn";
    turn: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}>, z.ZodObject<{
    action: z.ZodLiteral<"river">;
    river: z.ZodObject<{
        rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
        suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
    }, "strip", z.ZodTypeAny, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }, {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    }>;
}, "strip", z.ZodTypeAny, {
    action: "river";
    river: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}, {
    action: "river";
    river: {
        rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
        suit: "s" | "h" | "d" | "c" | "x";
    };
}>, z.ZodObject<{
    action: z.ZodLiteral<"showdown">;
}, "strip", z.ZodTypeAny, {
    action: "showdown";
}, {
    action: "showdown";
}>]>;
type ActionType = z.infer<typeof ActionSchema>;
declare const PlayerOptionFoldSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "fold";
}, {
    seat: number;
    action: "fold";
}>;
type PlayerOptionFoldType = z.infer<typeof PlayerOptionFoldSchema>;
declare let PlayerOptionBlindSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "blind";
}, {
    seat: number;
    action: "blind";
}>;
type PlayerOptionBlindType = z.infer<typeof PlayerOptionBlindSchema>;
declare let PlayerOptionStraddleSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "straddle";
}, {
    seat: number;
    action: "straddle";
}>;
type PlayerOptionStraddleType = z.infer<typeof PlayerOptionStraddleSchema>;
declare const PlayerOptionCallSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}>;
type PlayerOptionCallType = z.infer<typeof PlayerOptionCallSchema>;
declare const PlayerOptionBetSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    min: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
    max: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "bet";
    min: number | "unknown";
    max: number | "unknown";
}, {
    seat: number;
    action: "bet";
    min: number | "unknown";
    max: number | "unknown";
}>;
type PlayerOptionBetType = z.infer<typeof PlayerOptionBetSchema>;
declare const PlayerOptionCheckSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "check";
}, {
    seat: number;
    action: "check";
}>;
type PlayerOptionCheckType = z.infer<typeof PlayerOptionCheckSchema>;
declare const PlayerOptionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "fold";
}, {
    seat: number;
    action: "fold";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    min: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
    max: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "bet";
    min: number | "unknown";
    max: number | "unknown";
}, {
    seat: number;
    action: "bet";
    min: number | "unknown";
    max: number | "unknown";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "check";
}, {
    seat: number;
    action: "check";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "blind";
}, {
    seat: number;
    action: "blind";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "straddle";
}, {
    seat: number;
    action: "straddle";
}>]>;
type PlayerOptionType = z.infer<typeof PlayerOptionSchema>;
declare const DealerOptionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    action: z.ZodLiteral<"preflop">;
}, "strip", z.ZodTypeAny, {
    action: "preflop";
}, {
    action: "preflop";
}>, z.ZodObject<{
    action: z.ZodLiteral<"flop">;
    cards: z.ZodLiteral<3>;
}, "strip", z.ZodTypeAny, {
    action: "flop";
    cards: 3;
}, {
    action: "flop";
    cards: 3;
}>, z.ZodObject<{
    action: z.ZodLiteral<"turn">;
    cards: z.ZodLiteral<1>;
}, "strip", z.ZodTypeAny, {
    action: "turn";
    cards: 1;
}, {
    action: "turn";
    cards: 1;
}>, z.ZodObject<{
    action: z.ZodLiteral<"river">;
    cards: z.ZodLiteral<1>;
}, "strip", z.ZodTypeAny, {
    action: "river";
    cards: 1;
}, {
    action: "river";
    cards: 1;
}>, z.ZodObject<{
    action: z.ZodLiteral<"showdown">;
}, "strip", z.ZodTypeAny, {
    action: "showdown";
}, {
    action: "showdown";
}>]>;
declare const PokerRounds: readonly ["preflop", "flop", "turn", "river"];
type PokerRoundType = (typeof PokerRounds)[number];
type DealerOptionType = z.infer<typeof DealerOptionSchema>;
declare const NextOptionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "fold";
}, {
    seat: number;
    action: "fold";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}, {
    seat: number;
    action: "call";
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    min: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
    max: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "bet";
    min: number | "unknown";
    max: number | "unknown";
}, {
    seat: number;
    action: "bet";
    min: number | "unknown";
    max: number | "unknown";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "check";
}, {
    seat: number;
    action: "check";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "blind";
}, {
    seat: number;
    action: "blind";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
}, "strip", z.ZodTypeAny, {
    seat: number;
    action: "straddle";
}, {
    seat: number;
    action: "straddle";
}>, z.ZodObject<{
    action: z.ZodLiteral<"preflop">;
}, "strip", z.ZodTypeAny, {
    action: "preflop";
}, {
    action: "preflop";
}>, z.ZodObject<{
    action: z.ZodLiteral<"flop">;
    cards: z.ZodLiteral<3>;
}, "strip", z.ZodTypeAny, {
    action: "flop";
    cards: 3;
}, {
    action: "flop";
    cards: 3;
}>, z.ZodObject<{
    action: z.ZodLiteral<"turn">;
    cards: z.ZodLiteral<1>;
}, "strip", z.ZodTypeAny, {
    action: "turn";
    cards: 1;
}, {
    action: "turn";
    cards: 1;
}>, z.ZodObject<{
    action: z.ZodLiteral<"river">;
    cards: z.ZodLiteral<1>;
}, "strip", z.ZodTypeAny, {
    action: "river";
    cards: 1;
}, {
    action: "river";
    cards: 1;
}>, z.ZodObject<{
    action: z.ZodLiteral<"showdown">;
}, "strip", z.ZodTypeAny, {
    action: "showdown";
}, {
    action: "showdown";
}>]>;
type NextOptionType = z.infer<typeof NextOptionSchema>;
declare const isPlayerAction: (action: ActionType) => action is PlayerActionType;
declare const isDealerAction: (action: ActionType) => action is DealerActionType;
declare let isPlayerOption: (option: NextOptionType) => option is PlayerOptionType;
declare let isPlayerOptions: (options: NextOptionType[]) => options is PlayerOptionType[];
declare let isDealerOption: (option: NextOptionType) => option is DealerOptionType;
declare let isDealerOptions: (options: NextOptionType[]) => options is DealerOptionType[];
declare let getNextRoundOption: (round: PokerRoundType) => DealerOptionType;
declare let optionArrayToString: (options: NextOptionType[]) => string[];

export { ActionSchema, type ActionType, DealerActionSchema, type DealerActionType, DealerOptionSchema, type DealerOptionType, NextOptionSchema, type NextOptionType, type PlayerActionType, PlayerActionsSchema, PlayerBetSchema, type PlayerBetType, PlayerBlindActions, PlayerBlindSchema, type PlayerBlindType, PlayerCallSchema, type PlayerCallType, PlayerCheckSchema, type PlayerCheckType, PlayerCloseActions, PlayerFoldSchema, type PlayerFoldType, type PlayerIncreaseWagerType, PlayerOptionBetSchema, type PlayerOptionBetType, PlayerOptionBlindSchema, type PlayerOptionBlindType, PlayerOptionCallSchema, type PlayerOptionCallType, PlayerOptionCheckSchema, type PlayerOptionCheckType, PlayerOptionFoldSchema, type PlayerOptionFoldType, PlayerOptionSchema, PlayerOptionStraddleSchema, type PlayerOptionStraddleType, type PlayerOptionType, PlayerStraddleSchema, type PlayerStraddleType, type PokerRoundType, PokerRounds, getNextRoundOption, increaseWagerAction, isDealerAction, isDealerOption, isDealerOptions, isPlayerAction, isPlayerOption, isPlayerOptions, optionArrayToString };
