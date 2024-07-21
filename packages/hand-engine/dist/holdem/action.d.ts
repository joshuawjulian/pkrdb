import { z } from 'zod';
export declare const PlayerFoldSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    action: "fold";
    seat: number;
}, {
    action: "fold";
    seat: number;
}>;
export type PlayerFoldType = z.infer<typeof PlayerFoldSchema>;
export declare const PlayerCallSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>;
export type PlayerCallType = z.infer<typeof PlayerCallSchema>;
export declare const PlayerBetSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "bet";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "bet";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>;
export type PlayerBetType = z.infer<typeof PlayerBetSchema>;
export declare const PlayerCheckSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    action: "check";
    seat: number;
}, {
    action: "check";
    seat: number;
}>;
export type PlayerCheckType = z.infer<typeof PlayerCheckSchema>;
export declare const PlayerBlindSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "blind";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "blind";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>;
export type PlayerBlindType = z.infer<typeof PlayerBlindSchema>;
export declare const PlayerStraddleSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "straddle";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "straddle";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>;
export type PlayerStraddleType = z.infer<typeof PlayerStraddleSchema>;
export type PlayerIncreaseWagerType = PlayerBetType | PlayerBlindType | PlayerStraddleType;
export declare const increaseWagerAction: (action: ActionType) => action is PlayerIncreaseWagerType;
export declare const PlayerActionsSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "bet";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "bet";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "blind";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "blind";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    action: "check";
    seat: number;
}, {
    action: "check";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    action: "fold";
    seat: number;
}, {
    action: "fold";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "straddle";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "straddle";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>]>;
export declare const PlayerBlindActions: readonly ["blind", "straddle"];
export declare const PlayerCloseActions: readonly ["check", "call", "fold"];
export declare const DealerActionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
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
export type PlayerActionType = z.infer<typeof PlayerActionsSchema>;
export type DealerActionType = z.infer<typeof DealerActionSchema>;
export declare const ActionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "bet";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "bet";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "blind";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "blind";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    action: "check";
    seat: number;
}, {
    action: "check";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    action: "fold";
    seat: number;
}, {
    action: "fold";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "straddle";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "straddle";
    seat: number;
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
export type ActionType = z.infer<typeof ActionSchema>;
export declare const PlayerOptionFoldSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    action: "fold";
    seat: number;
}, {
    action: "fold";
    seat: number;
}>;
export type PlayerOptionFoldType = z.infer<typeof PlayerOptionFoldSchema>;
export declare let PlayerOptionBlindSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
}, "strip", z.ZodTypeAny, {
    action: "blind";
    seat: number;
}, {
    action: "blind";
    seat: number;
}>;
export type PlayerOptionBlindType = z.infer<typeof PlayerOptionBlindSchema>;
export declare let PlayerOptionStraddleSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
}, "strip", z.ZodTypeAny, {
    action: "straddle";
    seat: number;
}, {
    action: "straddle";
    seat: number;
}>;
export type PlayerOptionStraddleType = z.infer<typeof PlayerOptionStraddleSchema>;
export declare const PlayerOptionCallSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>;
export type PlayerOptionCallType = z.infer<typeof PlayerOptionCallSchema>;
export declare const PlayerOptionBetSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    min: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
    max: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
}, "strip", z.ZodTypeAny, {
    action: "bet";
    seat: number;
    min: number | "unknown";
    max: number | "unknown";
}, {
    action: "bet";
    seat: number;
    min: number | "unknown";
    max: number | "unknown";
}>;
export type PlayerOptionBetType = z.infer<typeof PlayerOptionBetSchema>;
export declare const PlayerOptionCheckSchema: z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    action: "check";
    seat: number;
}, {
    action: "check";
    seat: number;
}>;
export type PlayerOptionCheckType = z.infer<typeof PlayerOptionCheckSchema>;
export declare const PlayerOptionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    action: "fold";
    seat: number;
}, {
    action: "fold";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    min: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
    max: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
}, "strip", z.ZodTypeAny, {
    action: "bet";
    seat: number;
    min: number | "unknown";
    max: number | "unknown";
}, {
    action: "bet";
    seat: number;
    min: number | "unknown";
    max: number | "unknown";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    action: "check";
    seat: number;
}, {
    action: "check";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
}, "strip", z.ZodTypeAny, {
    action: "blind";
    seat: number;
}, {
    action: "blind";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
}, "strip", z.ZodTypeAny, {
    action: "straddle";
    seat: number;
}, {
    action: "straddle";
    seat: number;
}>]>;
export type PlayerOptionType = z.infer<typeof PlayerOptionSchema>;
export declare const DealerOptionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
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
export declare const PokerRounds: readonly ["preflop", "flop", "turn", "river"];
export type PokerRoundType = (typeof PokerRounds)[number];
export type DealerOptionType = z.infer<typeof DealerOptionSchema>;
export declare const NextOptionSchema: z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"fold">;
}, "strip", z.ZodTypeAny, {
    action: "fold";
    seat: number;
}, {
    action: "fold";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"call">;
    amount: z.ZodNumber;
    isAllIn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}, {
    action: "call";
    seat: number;
    amount: number;
    isAllIn: boolean;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"bet">;
    min: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
    max: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
}, "strip", z.ZodTypeAny, {
    action: "bet";
    seat: number;
    min: number | "unknown";
    max: number | "unknown";
}, {
    action: "bet";
    seat: number;
    min: number | "unknown";
    max: number | "unknown";
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"check">;
}, "strip", z.ZodTypeAny, {
    action: "check";
    seat: number;
}, {
    action: "check";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"blind">;
}, "strip", z.ZodTypeAny, {
    action: "blind";
    seat: number;
}, {
    action: "blind";
    seat: number;
}>, z.ZodObject<{
    seat: z.ZodNumber;
    action: z.ZodLiteral<"straddle">;
}, "strip", z.ZodTypeAny, {
    action: "straddle";
    seat: number;
}, {
    action: "straddle";
    seat: number;
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
export type NextOptionType = z.infer<typeof NextOptionSchema>;
export declare const isPlayerAction: (action: ActionType) => action is PlayerActionType;
export declare const isDealerAction: (action: ActionType) => action is DealerActionType;
export declare let isPlayerOption: (option: NextOptionType) => option is PlayerOptionType;
export declare let isPlayerOptions: (options: NextOptionType[]) => options is PlayerOptionType[];
export declare let isDealerOption: (option: NextOptionType) => option is DealerOptionType;
export declare let isDealerOptions: (options: NextOptionType[]) => options is DealerOptionType[];
export declare let getNextRoundOption: (round: PokerRoundType) => DealerOptionType;
