import { getData, renderListWithTemplate } from "./utils";

export default class ImageList {
  constructor(rover, camera, date) {
    this.rover = rover;
    this.camera = camera;
    this.date = date;
    this.url = `https://mars-photos.herokuapp.com/api/v1/rovers/${this.rover}/photos?earth_date=${this.date}`;
  }

  init() {
    if (this.camera !== "any") {
      this.url = this.url + `&camera=${this.camera}`;
    }
    getData(this.url, (data) => {
      this.renderImageList(data.photos);
      const imageListElement = document.getElementById("rover-images");
      imageListElement.innerHTML = "";
      if (data.photos.length === 0) {
        imageListElement.insertAdjacentHTML("beforeend", noImageTemplate());
      } else {
        imageListElement.insertAdjacentHTML(
          "beforeend",
          imageCountTemplate(data.photos.length, this.date)
        );
      }
    });
  }

  renderImageList(list) {
    renderListWithTemplate(
      imageTemplate,
      document.getElementById("rover-grid"),
      list,
      "beforeend",
      true
    );
  }
}

function imageTemplate(image) {
  return `<div class="image-card">
  <a href="${image.img_src}"><img src="${image.img_src}" alt="Photo from Mars rover ${image.rover.name}'s ${image.camera.full_name} Camera"></a>
  <p>${image.camera.full_name}</p>
  </div>`;
}

function noImageTemplate() {
  return `<h2>No images found for the selected date and camera</h2>`;
}

function imageCountTemplate(count, date) {
  return `<h2>Found ${count} Images For ${date}</h2>`;
}
