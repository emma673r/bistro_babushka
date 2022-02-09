const url = "https://babushka-dd8a.restdb.io/rest/menu";
const key = "600ec2fb1346a1524ff12de4";
const options = {
  headers: {
    "x-apikey": key,
  },
};

const btn = document.querySelector("button");
const container = document.querySelector("section");
const temp = document.querySelector("template");

window.addEventListener("DOMContentLoaded", start);

function start() {}

async function hentdata() {
  const respons = await fetch(url, options);
  const json = await respons.json();
  vis(json);
}

function vis(menu) {
  console.log(menu);
  menu.forEach((ret) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".navn").textContent = ret.navn;
    klon.querySelector(".pris").textContent += ret.pris + " dkk";
    klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;

    klon.querySelector("img").src = `/medium/${ret.billednavn}-md.jpg`;
    klon.querySelector("img").alt = ret.navn;

    container.appendChild(klon);
  });
}

hentdata();
