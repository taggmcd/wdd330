import { getData } from "./utils";

// https://mars-photos.herokuapp.com/api/v1/rovers/

export default class Rover {
  constructor(rover = "Curiosity") {
    if (rover == null) {
      this.rover = "Curiosity";
    } else {
      this.rover = rover;
    }
    this.roverData = {};
  }

  init() {
    getData(
      `https://mars-photos.herokuapp.com/api/v1/rovers/${this.rover}/`,
      (data) => {
        this.roverData = data.rover;
        this.renderRoverDetails("rover-details");
      }
    );
  }

  renderRoverDetails(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "afterBegin",
      roverDetailsTemplate(this.roverData)
    );
  }

  // getImages(camera, date) {
  //   getData(
  //     `https://mars-photos.herokuapp.com/api/v1/rovers/${this.rover}/photos?earth_date=${date}&camera=${camera}`,
  //     (data) => {
  //       console.log(data);
  //     }
  //   );
  // }
}

function roverDetailsTemplate(rover) {
  return `<div class="rover-hero-text">
  <h1 class="center">${rover.name}</h1>
  <div>
      <p>Launch Date: ${rover.launch_date}</p>
      <p>Landing Date: ${rover.landing_date}</p>
      <p>Status: ${rover.status}</p>
      <p>Total Images: ${rover.total_photos}</p>
      <p>Latest Image: ${rover.max_date}</p>
  </div>
</div>
<div> <img src="https://mars-photos.herokuapp.com/explore/images/${rover.name}_rover.jpg"
      alt="Image of the ${rover.name} rover">
</div>`;
}
