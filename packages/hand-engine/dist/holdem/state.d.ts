import { z } from 'zod';
import { PokerRoundType, PlayerBetType, PlayerStraddleType, PlayerBlindType } from './action.js';

declare const OptionsSchema: z.ZodObject<{
    reopenPercent: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    reopenPercent: number;
}, {
    reopenPercent?: number | undefined;
}>;
type OptionsType = z.infer<typeof OptionsSchema>;
declare const StackSchema: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
type StackType = z.infer<typeof StackSchema>;
declare const GameStateSchema: z.ZodObject<{
    options: z.ZodDefault<z.ZodObject<{
        reopenPercent: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        reopenPercent: number;
    }, {
        reopenPercent?: number | undefined;
    }>>;
    actionList: z.ZodArray<z.ZodDiscriminatedUnion<"action", [z.ZodObject<{
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
    }>]>, "many">;
    players: z.ZodArray<z.ZodObject<{
        startingStack: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
        cards: z.ZodArray<z.ZodObject<{
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
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
        startingStack: number | "unknown";
    }, {
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
        startingStack: number | "unknown";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    options: {
        reopenPercent: number;
    };
    actionList: ({
        seat: number;
        action: "fold";
    } | {
        seat: number;
        action: "call";
        amount: number;
        isAllIn: boolean;
    } | {
        seat: number;
        action: "bet";
        amount: number;
        isAllIn: boolean;
    } | {
        seat: number;
        action: "check";
    } | {
        seat: number;
        action: "blind";
        amount: number;
        isAllIn: boolean;
    } | {
        seat: number;
        action: "straddle";
        amount: number;
        isAllIn: boolean;
    } | {
        action: "preflop";
    } | {
        action: "flop";
        flop: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
    } | {
        action: "turn";
        turn: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        };
    } | {
        action: "river";
        river: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        };
    } | {
        action: "showdown";
    })[];
    players: {
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
        startingStack: number | "unknown";
    }[];
}, {
    actionList: ({
        seat: number;
        action: "fold";
    } | {
        seat: number;
        action: "call";
        amount: number;
        isAllIn: boolean;
    } | {
        seat: number;
        action: "bet";
        amount: number;
        isAllIn: boolean;
    } | {
        seat: number;
        action: "check";
    } | {
        seat: number;
        action: "blind";
        amount: number;
        isAllIn: boolean;
    } | {
        seat: number;
        action: "straddle";
        amount: number;
        isAllIn: boolean;
    } | {
        action: "preflop";
    } | {
        action: "flop";
        flop: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
    } | {
        action: "turn";
        turn: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        };
    } | {
        action: "river";
        river: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        };
    } | {
        action: "showdown";
    })[];
    players: {
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
        startingStack: number | "unknown";
    }[];
    options?: {
        reopenPercent?: number | undefined;
    } | undefined;
}>;
type GameStateType = z.infer<typeof GameStateSchema>;
declare const stateAtIndex: (state: GameStateType, index: number) => GameStateType;
type WageredEachRoundType = Record<number, Record<PokerRoundType, number>>;
declare const wageredEachRound: (state: GameStateType) => WageredEachRoundType;
declare const remainingStackSize: (state: GameStateType) => Record<number, number | "unknown">;
declare const rotateArray: <T>(arr: T[], count: number) => T[];
declare const nextSeat: (seats: number[]) => number[];
type RoundIndiciesType = {
    [round in PokerRoundType]: number;
};
declare let getRoundIndicies: (state: GameStateType) => RoundIndiciesType;
declare const toString: (state: GameStateType) => string;
declare let actionListToString: (state: GameStateType) => string;
declare let getBets: (state: GameStateType) => PlayerBetType[];
declare let getBlindsStraddles: (state: GameStateType) => (PlayerStraddleType | PlayerBlindType)[];

export { GameStateSchema, type GameStateType, OptionsSchema, type OptionsType, type RoundIndiciesType, StackSchema, type StackType, type WageredEachRoundType, actionListToString, getBets, getBlindsStraddles, getRoundIndicies, nextSeat, remainingStackSize, rotateArray, stateAtIndex, toString, wageredEachRound };
