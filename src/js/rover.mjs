import { getData } from "./utils";

// https://mars-photos.herokuapp.com/api/v1/rovers/

export default class Rover {
  constructor(rover) {
    this.rover = rover;
    this.launchDate;
    this.landingDate;
    this.maxSol;
    this.maxDate;
    this.photos;
    this.cameras;
    this.status;
  }

  init() {
    getData(
      `https://mars-photos.herokuapp.com/api/v1/rovers/${this.rover}/`,
      (data) => {
        let roverData = data.rover;
        this.launchDate = roverData["launch_date"];
        this.landingDate = roverData["landing_date"];
        this.maxSol = roverData["max_sol"];
        this.maxDate = roverData["max_date"];
        this.photos = roverData["total_photos"];
        this.cameras = roverData["cameras"];
        this.status = roverData["status"];
      }
    );
  }
}
