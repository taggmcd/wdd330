import Rover from "./rover.mjs";
import { getUrlParam } from "./utils";

let rover = getUrlParam("rover");

if (!rover) {
  rover = "Curiosity";
}

new Rover(rover).init();
