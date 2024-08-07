import { z } from 'zod';

declare const CardRankSchema: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
declare const CardSuitSchema: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
type CardSuitType = z.infer<typeof CardSuitSchema>;
declare const CardSchema: z.ZodObject<{
    rank: z.ZodUnion<[z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">, z.ZodLiteral<"6">, z.ZodLiteral<"7">, z.ZodLiteral<"8">, z.ZodLiteral<"9">, z.ZodLiteral<"T">, z.ZodLiteral<"J">, z.ZodLiteral<"Q">, z.ZodLiteral<"K">, z.ZodLiteral<"A">, z.ZodLiteral<"X">]>;
    suit: z.ZodUnion<[z.ZodLiteral<"s">, z.ZodLiteral<"h">, z.ZodLiteral<"d">, z.ZodLiteral<"c">, z.ZodLiteral<"x">]>;
}, "strip", z.ZodTypeAny, {
    rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
    suit: "s" | "h" | "d" | "c" | "x";
}, {
    rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A" | "X";
    suit: "s" | "h" | "d" | "c" | "x";
}>;
type CardType = z.infer<typeof CardSchema>;
declare let suitToCharacter: (suit: CardSuitType) => "x" | "♠" | "♥" | "♦" | "♣";
declare let cardToString: (card: CardType) => string;

export { CardRankSchema, CardSchema, CardSuitSchema, type CardSuitType, type CardType, cardToString, suitToCharacter };
