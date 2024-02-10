import Rover from "./rovers.mjs";

let rover = new Rover("Curiosity");

rover.init();

let data = await rover.getRoverDetails();
console.log(data);
