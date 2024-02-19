import { setActivePage } from "./navbar.mjs";

export function setLocalStorage(key, data, ttlSeconds = 300) {
  // localStorage.setItem(key, JSON.stringify(data));
  const ttl = ttlSeconds * 1000;
  const now = new Date();

  const item = {
    data: data,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorage(key) {
  // return JSON.parse(localStorage.getItem(key));
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.data;
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

export function getUrlParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}
