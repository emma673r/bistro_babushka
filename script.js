const url = "https://babushka-dd8a.restdb.io/rest/menu";
const key = "600ec2fb1346a1524ff12de4";
const options = {
  headers: {
    "x-apikey": key,
  },
};

const btn = document.querySelectorAll("button");
const container = document.querySelector("section");
const temp = document.querySelector("template");
const h2 = document.querySelector("#kategoriH2");

let retter;
let filter = "alle";

window.addEventListener("DOMContentLoaded", start);

function start() {
  btn.forEach((knap) => knap.addEventListener("click", filtrerMenu));
  hentData();
}

function filtrerMenu() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visMenu();
  h2.textContent = this.textContent;
}

async function hentData() {
  const respons = await fetch(url, options);
  menu = await respons.json();
  visMenu();
}

function visMenu() {
  console.log("menu", menu);
  container.textContent = "";
  menu.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      const klon = temp.cloneNode(true).content;

      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".pris").textContent += ret.pris + " dkk";
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector("img").src = `/medium/${ret.billednavn}-md.jpg`;
      klon.querySelector("img").alt = ret.navn;

      container.appendChild(klon);
    }
  });
}

hentData();
