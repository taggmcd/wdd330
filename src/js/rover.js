import RoverControls from "./roverControls.mjs";
import Rover from "./rover.mjs";
import ImageList from "./images.mjs";
import { getUrlParam, setLocalStorage, getLocalStorage } from "./utils";

addEventListener("load", () => {
  const form = document.getElementById("rover-select");
  const roverSelect = document.getElementById("rover");
  const cameraSelect = document.getElementById("camera");
  const earthDateSelect = document.getElementById("earth_date");

  let rover = getLocalStorage("rover");
  let camera = getLocalStorage("camera");
  let earth_date = getLocalStorage("earth_date");

  new RoverControls(rover, camera, earth_date).init();
  new Rover(rover).init();

  roverSelect.addEventListener("change", (event) => {
    new Rover(event.target.value).init();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    rover = roverSelect.value;
    camera = cameraSelect.value;
    earth_date = earthDateSelect.value;
    setLocalStorage("rover", rover, 9000);
    setLocalStorage("camera", camera, 9000);
    setLocalStorage("earth_date", earth_date, 9000);

    new Rover(rover).init();
    new ImageList(rover, camera, earth_date).init();
  });
});
