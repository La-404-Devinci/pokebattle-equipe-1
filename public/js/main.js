"use strict"

function removeChildrens(element) {
  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }
}


console.log("ok")


if(localStorage.getItem("pokemonNames")) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
  .then(resp => resp.json())
  .then(data => {localStorage.setItem("pokemonNames", JSON.stringify(data))})
}

let dataList = document.querySelector("#pokemons")
let dataListOptTemplate = document.querySelector("#pokemonsOpt");
let formTeam = document.querySelector(".form-team")


document.querySelectorAll("form input").forEach(input => {
  input.addEventListener("input", e => {
    removeChildrens(dataList);
    let pokemonFiltered = JSON.parse(localStorage.getItem("pokemonNames")).results.filter(pokemon => pokemon.name.includes(e.target.value))
    pokemonFiltered.forEach(pokemon => {
      let clone = dataListOptTemplate.content.cloneNode(true).querySelector("option");
      clone.value = pokemon.name
      clone.textContent = pokemon.name
      dataList.appendChild(clone)
    })
  })
})

formTeam.addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = new FormData(formTeam)
  const formProps = Object.fromEntries(formData);
  console.log(formProps)
})



console.log("ok2")

var socket = io();

// socket.on("connect", () => {
setInterval(() => {
  socket.send({
    eventName: "CONNECTION",
    pseudo: localStorage.getItem("pseudo"),
  })

}, 1000)
// })