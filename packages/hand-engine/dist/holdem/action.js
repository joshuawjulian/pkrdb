import { z } from 'zod';
import { CardSchema } from './card';
export const PlayerFoldSchema = z.object({
    seat: z.number(),
    action: z.literal('fold'),
});
export const PlayerCallSchema = z.object({
    seat: z.number(),
    action: z.literal('call'),
    amount: z.number(),
    isAllIn: z.boolean(),
});
export const PlayerBetSchema = z.object({
    seat: z.number(),
    action: z.literal('bet'),
    amount: z.number(),
    isAllIn: z.boolean(),
});
export const PlayerCheckSchema = z.object({
    seat: z.number(),
    action: z.literal('check'),
});
export const PlayerBlindSchema = z.object({
    seat: z.number(),
    action: z.literal('blind'),
    amount: z.number(),
    isAllIn: z.boolean(),
});
export const PlayerStraddleSchema = z.object({
    seat: z.number(),
    action: z.literal('straddle'),
    amount: z.number(),
    isAllIn: z.boolean(),
});
export const increaseWagerAction = (action) => {
    return (action.action === 'bet' ||
        action.action === 'blind' ||
        action.action === 'straddle');
};
// player actions first
export const PlayerActionsSchema = z.discriminatedUnion('action', [
    PlayerBetSchema,
    PlayerBlindSchema,
    PlayerCallSchema,
    PlayerCheckSchema,
    PlayerFoldSchema,
    PlayerStraddleSchema,
]);
// These increase the bet size AND give action after being called
export const PlayerBlindActions = ['blind', 'straddle'];
// These attempt to close the action
export const PlayerCloseActions = ['check', 'call', 'fold'];
export const DealerActionSchema = z.discriminatedUnion('action', [
    z.object({
        action: z.literal('preflop'),
    }),
    z.object({
        action: z.literal('flop'),
        flop: z.array(CardSchema).length(3),
    }),
    z.object({
        action: z.literal('turn'),
        turn: CardSchema,
    }),
    z.object({
        action: z.literal('river'),
        river: CardSchema,
    }),
    z.object({
        action: z.literal('showdown'),
    }),
]);
export const ActionSchema = z.discriminatedUnion('action', [
    ...PlayerActionsSchema.options,
    ...DealerActionSchema.options,
]);
export const PlayerOptionFoldSchema = z.object({
    seat: z.number(),
    action: z.literal('fold'),
});
export let PlayerOptionBlindSchema = z.object({
    seat: z.number(),
    action: z.literal('blind'),
});
export let PlayerOptionStraddleSchema = z.object({
    seat: z.number(),
    action: z.literal('straddle'),
});
export const PlayerOptionCallSchema = z.object({
    seat: z.number(),
    action: z.literal('call'),
    amount: z.number(),
    isAllIn: z.boolean(),
});
export const PlayerOptionBetSchema = z.object({
    seat: z.number(),
    action: z.literal('bet'),
    min: z.union([z.number().min(0), z.literal('unknown')]),
    max: z.union([z.number().min(0), z.literal('unknown')]),
});
export const PlayerOptionCheckSchema = z.object({
    seat: z.number(),
    action: z.literal('check'),
});
export const PlayerOptionSchema = z.discriminatedUnion('action', [
    PlayerOptionFoldSchema,
    PlayerOptionCallSchema,
    PlayerOptionBetSchema,
    PlayerOptionCheckSchema,
    PlayerOptionBlindSchema,
    PlayerOptionStraddleSchema,
]);
export const DealerOptionSchema = z.discriminatedUnion('action', [
    z.object({
        action: z.literal('preflop'),
    }),
    z.object({
        action: z.literal('flop'),
        cards: z.literal(3),
    }),
    z.object({
        action: z.literal('turn'),
        cards: z.literal(1),
    }),
    z.object({
        action: z.literal('river'),
        cards: z.literal(1),
    }),
    z.object({
        action: z.literal('showdown'),
    }),
]);
export const PokerRounds = ['preflop', 'flop', 'turn', 'river'];
export const NextOptionSchema = z.discriminatedUnion('action', [
    ...PlayerOptionSchema.options,
    ...DealerOptionSchema.options,
]);
export const isPlayerAction = (action) => {
    return PlayerActionsSchema.safeParse(action).success;
};
export const isDealerAction = (action) => {
    return DealerActionSchema.safeParse(action).success;
};
export let isPlayerOption = (option) => {
    return PlayerOptionSchema.safeParse(option).success;
};
export let isPlayerOptions = (options) => {
    return z.array(PlayerOptionSchema).safeParse(options).success;
};
export let isDealerOption = (option) => {
    return DealerOptionSchema.safeParse(option).success;
};
export let isDealerOptions = (options) => {
    return z.array(DealerOptionSchema).safeParse(options).success;
};
export let getNextRoundOption = (round) => {
    if (round === 'preflop') {
        return { action: 'flop', cards: 3 };
    }
    else if (round === 'flop') {
        return { action: 'turn', cards: 1 };
    }
    else if (round === 'turn') {
        return { action: 'river', cards: 1 };
    }
    else {
        return { action: 'showdown' };
    }
};
