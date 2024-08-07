// src/holdem/seat.ts
var didSeatStraddle = (state, seatIndex) => {
  return state.actionList.filter((action) => {
    return action.action === "straddle" && action.seat === seatIndex;
  }).length > 0;
};
var isSeatBlind = (state, seatIndex) => {
  return state.actionList.filter((action) => {
    return action.action === "blind" && action.seat === seatIndex;
  }).length > 0;
};
var getNumberBlinds = (state) => {
  return state.actionList.filter((action) => {
    return action.action === "blind";
  }).length;
};
var getPositionNames = (state) => {
  let numSeats = state.players.length;
  let posNames = new Array(numSeats).fill({
    longName: "",
    shortName: ""
  });
  posNames[numSeats - 1] = { longName: "Button", shortName: "BTN" };
  let numBlinds = 0;
  state.actionList.forEach((action) => {
    if (action.action === "blind") {
      posNames[action.seat] = { longName: "Blind", shortName: "BL" };
      numBlinds++;
    }
    if (action.action === "straddle") {
      posNames[action.seat] = { longName: "Straddle", shortName: "ST" };
    }
  });
  if (numBlinds > 1) {
    let blindCounter = 1;
    for (let i = 0; i < numSeats; i++) {
      if (posNames[i].longName === "Blind") {
        if (blindCounter === 1) {
          posNames[i] = { longName: "Small Blind", shortName: "SB" };
        } else if (blindCounter === 2) {
          posNames[i] = { longName: "Big Blind", shortName: "BB" };
        } else {
          posNames[i] = {
            longName: `${blindCounter} Blind`,
            shortName: `${blindCounter}B`
          };
        }
        blindCounter++;
      }
    }
  }
  let middleSeatNums = numSeats - numBlinds - 1;
  if (middleSeatNums <= 0) {
    return posNames;
  }
  if (posNames[numBlinds].longName === "") {
    posNames[numBlinds] = { longName: "Under the Gun", shortName: "UTG" };
  }
  if (posNames[numSeats - 2].longName === "") {
    posNames[numSeats - 2] = { longName: "Cutoff", shortName: "CO" };
  }
  if (posNames[numSeats - 3].longName === "") {
    posNames[numSeats - 3] = { longName: "High Jack", shortName: "HJ" };
  }
  if (posNames[numSeats - 4].longName === "") {
    posNames[numSeats - 4] = { longName: "Low Jack", shortName: "LJ" };
  }
  let remainingSeats = posNames.filter((pos) => pos.longName === "").length;
  if (remainingSeats === 1) {
    posNames[numBlinds + 1] = { longName: "Middle Position", shortName: "MP" };
  } else if (remainingSeats === 2) {
    posNames[numBlinds + 1] = { longName: "Middle Position", shortName: "MP" };
    posNames[numBlinds + 2] = {
      longName: "Middle Position + 1",
      shortName: "MP1"
    };
  } else if (remainingSeats === 3) {
    posNames[numBlinds + 1] = {
      longName: "Under the Gun + 1",
      shortName: "UTG1"
    };
    posNames[numBlinds + 2] = { longName: "Middle Position", shortName: "MP" };
    posNames[numBlinds + 3] = {
      longName: "Middle Position + 1",
      shortName: "MP1"
    };
  }
  return posNames;
};
var getPositionName = (state, seatIndex) => {
  return getPositionNames(state)[seatIndex];
};
export {
  didSeatStraddle,
  getNumberBlinds,
  getPositionName,
  getPositionNames,
  isSeatBlind
};
//# sourceMappingURL=seat.js.map