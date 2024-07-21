import { z } from 'zod';
import { PlayerBetType, PlayerBlindType, PlayerStraddleType, PokerRoundType } from './action';
export declare const OptionsSchema: z.ZodObject<{
    reopenPercent: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    reopenPercent: number;
}, {
    reopenPercent?: number | undefined;
}>;
export type OptionsType = z.infer<typeof OptionsSchema>;
export declare const StackSchema: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"unknown">]>;
export type StackType = z.infer<typeof StackSchema>;
export declare const GameStateSchema: z.ZodObject<{
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
        startingStack: number | "unknown";
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
    }, {
        startingStack: number | "unknown";
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    options: {
        reopenPercent: number;
    };
    actionList: ({
        action: "bet";
        seat: number;
        amount: number;
        isAllIn: boolean;
    } | {
        action: "blind";
        seat: number;
        amount: number;
        isAllIn: boolean;
    } | {
        action: "call";
        seat: number;
        amount: number;
        isAllIn: boolean;
    } | {
        action: "check";
        seat: number;
    } | {
        action: "fold";
        seat: number;
    } | {
        action: "straddle";
        seat: number;
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
        startingStack: number | "unknown";
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
    }[];
}, {
    actionList: ({
        action: "bet";
        seat: number;
        amount: number;
        isAllIn: boolean;
    } | {
        action: "blind";
        seat: number;
        amount: number;
        isAllIn: boolean;
    } | {
        action: "call";
        seat: number;
        amount: number;
        isAllIn: boolean;
    } | {
        action: "check";
        seat: number;
    } | {
        action: "fold";
        seat: number;
    } | {
        action: "straddle";
        seat: number;
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
        startingStack: number | "unknown";
        cards: {
            rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
            suit: "s" | "h" | "d" | "c" | "x";
        }[];
    }[];
    options?: {
        reopenPercent?: number | undefined;
    } | undefined;
}>;
export type GameStateType = z.infer<typeof GameStateSchema>;
export declare const stateAtIndex: (state: GameStateType, index: number) => GameStateType;
export type WageredEachRoundType = Record<number, Record<PokerRoundType, number>>;
export declare const wageredEachRound: (state: GameStateType) => WageredEachRoundType;
export declare const remainingStackSize: (state: GameStateType) => Record<number, number | "unknown">;
export declare const rotateArray: <T>(arr: T[], count: number) => T[];
export declare const nextSeat: (seats: number[]) => number[];
export type RoundIndiciesType = {
    [round in PokerRoundType]: number;
};
export declare let getRoundIndicies: (state: GameStateType) => RoundIndiciesType;
export declare const toString: (state: GameStateType) => string;
export declare let actionListToString: (state: GameStateType) => string;
export declare let getBets: (state: GameStateType) => PlayerBetType[];
export declare let getBlindsStraddles: (state: GameStateType) => (PlayerStraddleType | PlayerBlindType)[];
