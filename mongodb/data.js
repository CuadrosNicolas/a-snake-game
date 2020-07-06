db = db.getSiblingDB("admin");

db.levels.insert({
  width: 10,
  height: 10,
  player: {
    x: 0,
    y: 0,
  },
  walls: [],
  refreshRate: 150,
  gameMode: 0,
  name: "UNKNOWN",
  playerResults: [],
  __v: 0,
});
