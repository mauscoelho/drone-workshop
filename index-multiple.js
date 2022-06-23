const run = require("./index");

const commandsList = [
  "command",
  "takeoff",
  "down 10",
  "forward 330",
  "up 40",
  "right 150",
  "back 330",
  "land",
];

run(commandsList);
run(commandsList, "192.168.8.137");
