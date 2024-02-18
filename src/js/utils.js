import { setActivePage } from "./navbar.mjs";

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function getData(url, cb) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    cb(data);
  } catch (error) {
    console.error(error);
  }
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const elementList = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, elementList.join(""));
}

export function renderWithTemplate(
  parentElement,
  data,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeader() {
  const header = document.querySelector("header");
  const headerTemplate = await loadTemplate("../partials/header.html");
  renderWithTemplate(header, headerTemplate);
  setActivePage();
}

export async function loadFooter() {
  const footer = document.querySelector("footer");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  renderWithTemplate(footer, footerTemplate);
  setCopyYear();
}

function setCopyYear() {
  const year = new Date().getFullYear();
  document.getElementById("copy-year").textContent = year;
}
