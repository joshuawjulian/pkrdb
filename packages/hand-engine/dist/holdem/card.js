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
var suitToCharacter = (suit) => {
  switch (suit) {
    case "s":
      return "\u2660";
    case "h":
      return "\u2665";
    case "d":
      return "\u2666";
    case "c":
      return "\u2663";
  }
  return "\xBF";
};
var cardToString = (card) => {
  return card.rank + suitToCharacter(card.suit);
};
export {
  CardRankSchema,
  CardSchema,
  CardSuitSchema,
  cardToString,
  suitToCharacter
};
//# sourceMappingURL=card.js.map