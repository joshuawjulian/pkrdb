import { z } from 'zod';
export const CardRankSchema = z.union([
    z.literal('2'),
    z.literal('3'),
    z.literal('4'),
    z.literal('5'),
    z.literal('6'),
    z.literal('7'),
    z.literal('8'),
    z.literal('9'),
    z.literal('T'),
    z.literal('J'),
    z.literal('Q'),
    z.literal('K'),
    z.literal('A'),
    z.literal('X'),
]);
export const CardSuitSchema = z.union([
    z.literal('s'),
    z.literal('h'),
    z.literal('d'),
    z.literal('c'),
    z.literal('x'),
]);
export const CardSchema = z.object({
    rank: CardRankSchema,
    suit: CardSuitSchema,
});
export let suitToCharacter = (suit) => {
    switch (suit) {
        case 's':
            return '♠';
        case 'h':
            return '♥';
        case 'd':
            return '♦';
        case 'c':
            return '♣';
    }
    return '¿';
};
export let cardToString = (card) => {
    return card.rank + suitToCharacter(card.suit);
};