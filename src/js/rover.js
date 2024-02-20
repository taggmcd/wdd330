import RoverControls from "./roverControls.mjs";
import Rover from "./rover.mjs";
import ImageList from "./images.mjs";
import { getUrlParam } from "./utils";

addEventListener("load", () => {
  let rover = getUrlParam("rover");
  let camera = getUrlParam("camera");
  let earth_date = getUrlParam("earth_date");

  new RoverControls(rover, camera, earth_date).init();

  new Rover(rover).init();

  const form = document.getElementById("rover-select");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const roverSelect = document.getElementById("rover");
    const cameraSelect = document.getElementById("camera");
    const earthDateSelect = document.getElementById("earth_date");

    rover = roverSelect.value;
    camera = cameraSelect.value;
    earth_date = earthDateSelect.value;

    new Rover(rover).init();
    new ImageList(rover, camera, earth_date).init();
  });
});
