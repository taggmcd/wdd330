import { getData, setLocalStorage, getLocalStorage } from "./utils";

export default class RoverControls {
  constructor(
    selectedRover = null,
    selectedCamera = null,
    selectedDate = null
  ) {
    if (selectedRover == null) {
      this.selectedRover = "Curiosity";
    } else {
      this.selectedRover = selectedRover;
    }
    this.selectedCamera = selectedCamera;
    this.selectedDate = selectedDate;
  }

  init() {
    this.rovers = getLocalStorage("rovers");

    if (this.rovers == null) {
      getData(`https://mars-photos.herokuapp.com/api/v1/rovers/`, (data) => {
        setLocalStorage("rovers", data.rovers, 300);
        this.rovers = data.rovers;
        this.renderRovers(this.rovers);

        let aciveRover = this.rovers.filter(
          (rover) => rover.name === this.selectedRover
        );
        this.renderCameras(aciveRover[0].cameras, this.selectedCamera);
        this.renderDates(aciveRover[0], this.selectedDate);
      });
    } else {
      this.renderRovers(this.rovers, this.selectedRover);
      let aciveRover = this.rovers.filter(
        (rover) => rover.name === this.selectedRover
      );
      this.renderCameras(aciveRover[0].cameras, this.selectedCamera);
      this.renderDates(aciveRover[0], this.selectedDate);
    }
  }

  renderRovers(rovers, selected) {
    const parentElement = document.getElementById("rover");
    let options = [];
    parentElement.innerHTML = "";
    rovers.forEach((rover) => {
      if (rover.name === selected) {
        options.push(
          `<option selected value="${rover.name}">${rover.name}</option>`
        );
      } else {
        options.push(`<option value="${rover.name}">${rover.name}</option>`);
      }
    });
    parentElement.insertAdjacentHTML("beforeend", options);
    parentElement.addEventListener("change", (event) => {
      let aciveRover = this.rovers.filter(
        (rover) => rover.name === event.target.value
      );
      this.renderCameras(aciveRover[0].cameras, this.selectedCamera);
      this.renderDates(aciveRover[0], aciveRover[0].max_date);
    });
  }

  renderCameras(cameras, selected) {
    const parentElement = document.getElementById("camera");
    parentElement.innerHTML = "";
    let options = [];
    if (selected == null) {
      options.push(`<option selected value="any">Any</option>`);
    } else {
      options.push(`<option value="any">Any</option>`);
    }
    cameras.forEach((camera) => {
      if (camera.name === selected) {
        options.push(
          `<option selected value="${camera.name}">${camera.full_name}</option>`
        );
      } else {
        options.push(
          `<option value="${camera.name}">${camera.full_name}</option>`
        );
      }
    });
    parentElement.insertAdjacentHTML("beforeend", options);
  }

  renderDates(rover, date = null) {
    const parentElement = document.getElementById("earth_date");
    parentElement.setAttribute("min", rover.landing_date);
    parentElement.setAttribute("max", rover.max_date);
    if (date == null) {
      parentElement.value = rover.max_date;
    } else {
      parentElement.value = date;
    }
  }
}
