const home = "/index.html";
const rover = "/rover.html";
const about = "/about.html";

export function setActivePage() {
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  if (currentUrl === home || currentUrl === "/") {
    document.getElementById("home").classList.add("nav-link-active");
  } else if (currentUrl === rover || currentUrl === "/rover") {
    document.getElementById("rover").classList.add("nav-link-active");
  } else if (currentUrl === about || currentUrl === "/about") {
    document.getElementById("about").classList.add("nav-link-active");
  }
}
