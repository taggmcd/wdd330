import Rover from "./rover.mjs";
import { loadHeader, loadFooter } from "./utils";

loadHeader();
loadFooter();

let curiosity = new Rover("curiosity");

curiosity.init();
