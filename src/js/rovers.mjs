// https://mars-photos.herokuapp.com/api/v1/rovers/

export default class Rover {
  constructor(rover) {
    this.rover = rover;
  }

  async init() {
    this.roverUrl = `https://mars-photos.herokuapp.com/api/v1/rovers/${this.rover}/`;
    const response = await fetch(this.roverUrl);
    const data = await response.json();
    this.roverData = data.rover;
    this.launchDate = this.roverData["launch_date"];
    this.landingDate = this.roverData["landing_date"];
    this.maxSol = this.roverData["max_sol"];
    this.maxDate = this.roverData["max_date"];
    this.photos = this.roverData["total_photos"];
    this.cameras = this.roverData["cameras"];
    this.status = this.roverData["status"];

    // console.log(this.roverData);
  }

  getRoverDetails() {
    return this.roverData;
  }
}
