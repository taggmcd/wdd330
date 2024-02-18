const home = "/index.html";
const rover = "/rover.html";
const about = "/about.html";

export function setActivePage() {
  const currentUrl = window.location.pathname;

  if (currentUrl === home) {
    document.getElementById("home").classList.add("nav-link-active");
  } else if (currentUrl === rover) {
    document.getElementById("rover").classList.add("nav-link-active");
  } else if (currentUrl === about) {
    document.getElementById("about").classList.add("nav-link-active");
  }
}
