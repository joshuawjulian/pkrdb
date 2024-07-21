import { NextOptionType } from './action';
import { GameStateType } from './state';
import { ZodSchema } from 'zod';
export declare let sixHandedSimple: GameStateType;
export declare let cardsToString: (cards: {
    rank: string;
    suit: string;
}) => string;
export declare let displaySeats: (state: GameStateType) => void;
export declare let displayOptions: (options: NextOptionType[]) => void;
export declare let displayActionList: (state: GameStateType) => void;
export declare let getInput: (prompt: string, schema: ZodSchema) => Promise<any>;
export declare let getCardInput: () => Promise<{
    rank: any;
    suit: any;
}>;
