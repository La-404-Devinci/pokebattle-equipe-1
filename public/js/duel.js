"use strict"

import { updateGame, getPlayerByUUID, updatePlayer } from "./duelFuncts.js"

let globalGame;
let player;
let opponent;
window.waitingDeathSwitch = false;
window.socket = io()

let movesContainer = document.querySelector(".pokemon__moves")

window.selectedSwitchPokemon = null;
let switchBtn = document.querySelector(".switch")
let switchBox = document.querySelector(".switchBox")
let switchBox__team = document.querySelector(".switchBox")
let switchBox__ValideBtn = document.querySelector(".switchBox__btn")
let switchBox__close = document.querySelector(".switchBox__close")

let selectedDeathSwitchPokemon;
let deathSwitchBox = document.querySelector(".deathSwitchBox")
let deathSwitchBox__team = document.querySelector(".deathSwitchBox__team")
let deathSwitchBox__ValideBtn = document.querySelector(".deathSwitchBox__btn")

switchBtn.addEventListener("click", () => {
  switchBox.style.display = "block"
})

switchBox__close.addEventListener("click", () => {
  if(window.waitingDeathSwitch) return
  switchBox.style.display = "none"
})

switchBox__ValideBtn.addEventListener("click", () => {
  if(!window.selectedSwitchPokemon) return
  console.log("switch")
  window.socket.emit('ROUND_INSTRUCTION', {
    playerUUID: sessionStorage.getItem("playerUUID"),
    gameUUID: sessionStorage.getItem("gameUUID"),
    type: 'SWITCH',
    pokemonToSwitchName: window.selectedSwitchPokemon,
  })
})

window.socket.on('GAME_START', (game) => {
  console.log('GAME_START', game)
  updateGame(game)
});

window.socket.on('ROUND_DATA', (game) => {
  console.log('ROUND_DATA', game)
  let player = getPlayerByUUID(sessionStorage.getItem("playerUUID"), game.players)
  updateGame(game)
  if(player.team[player.activePokemonIndex].stats.hp.current <= 0) {
    window.waitingDeathSwitch = true;
    switchBox.style.display = "block";
  }
})

window.socket.on('DEATH_SWITCHED', (game) => {
  window.waitingDeathSwitch = false;
  switchBox.style.display = "none";
  updateGame(game)
})

switchBox__ValideBtn.addEventListener("click", () => {
  if(!window.selectedSwitchPokemon) return
  console.log("switch")
  if(!window.waitingDeathSwitch) {
    window.socket.emit('ROUND_INSTRUCTION', {
      playerUUID: sessionStorage.getItem("playerUUID"),
      gameUUID: sessionStorage.getItem("gameUUID"),
      type: 'SWITCH',
      pokemonToSwitchName: window.selectedSwitchPokemon,
    })
    switchBox.style.display = "none"
  } else {
    window.socket.emit('DEATH_SWITCH', {
      playerUUID: sessionStorage.getItem("playerUUID"),
      gameUUID: sessionStorage.getItem("gameUUID"),
      pokemonToSwitchName: window.selectedSwitchPokemon,
    })
  }
  document.querySelector(".team__pokemon--selected").classList.remove("team__pokemon--selected")
  window.selectedSwitchPokemon = null;
})