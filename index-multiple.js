const run = require("./index");

const commandsList = [
  "command",
  "speed 100",
  "takeoff",
  "forward 160",
  "go 0 0 60 100 m4",
  "forward 160",
  "go 0 0 100 100 m3",
  "right 120",
  "go 0 0 100 100 m2",
  "back 160",
  "go 0 0 100 100 m8",
  "back 130",
  "emergency",
];

run(commandsList, "192.168.8.237");
