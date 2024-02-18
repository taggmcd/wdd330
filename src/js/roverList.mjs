import { getData, renderListWithTemplate, renderWithTemplate } from "./utils";

// https://mars-photos.herokuapp.com/api/v1/rovers/

export default class RoverList {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    getData(`https://mars-photos.herokuapp.com/api/v1/rovers/`, (data) => {
      this.renderList(data.rovers);
    });
  }

  renderList(list) {
    renderListWithTemplate(roverTemplate, this.listElement, list, "beforeend");
  }
}

function roverTemplate(rover) {
  return `<section>
  <a href="/rover.html?rover=${rover.name}">
      <h2>${rover.name}</h2>
  </a>
  <p>Launch Date: ${rover.launch_date}</p>
  <p>Landing Date: ${rover.landing_date}</p>
  <p>Status: ${rover.status}</p>
  <p>Total Images: ${rover.total_photos}</p>
  <p>Latest Image: ${rover.max_date}</p>
  <div class="center">
      <a class="button" href="/rover.html?rover=${rover.name}">
          View Images
      </a>
  </div>
</section>`;
}
