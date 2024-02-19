const home = "/index.html";
const rover = "/rover.html";
const about = "/about.html";

export function setActivePage() {
  const currentUrl = window.location.pathname;
  if (currentUrl === home || currentUrl === "/") {
    document.getElementById("home-nav").classList.add("nav-link-active");
  } else if (currentUrl === rover || currentUrl === "/rover") {
    document.getElementById("rover-nav").classList.add("nav-link-active");
  } else if (currentUrl === about || currentUrl === "/about") {
    document.getElementById("about-nav").classList.add("nav-link-active");
  }
}
