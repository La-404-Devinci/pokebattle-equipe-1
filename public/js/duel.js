"use strict"

let player;
let opponent;
const socket = io()

let movesContainer = document.querySelector(".pokemon__moves")

let selectedSwitchPokemon;
let switchBtn = document.querySelector(".switch")
let switchBox = document.querySelector(".switchBox")
let switchBox__team = document.querySelector(".switchBox__team")
let switchBox__ValideBtn = document.querySelector(".switchBox__btn")
let switchBox__close = document.querySelector(".switchBox__close")

switchBtn.addEventListener("click", () => {
  switchBox.style.display = "block"
})

switchBox__close.addEventListener("click", () => {
  switchBox.style.display = "none"
})

switchBox__ValideBtn.addEventListener("click", () => {
  if(!selectedSwitchPokemon) return
  console.log("switch")
  socket.emit('ROUND_INSTRUCTION', {
    playerUUID: sessionStorage.getItem("playerUUID"),
    gameUUID: sessionStorage.getItem("gameUUID"),
    type: 'SWITCH',
    target: selectedSwitchPokemon,
  })
})

socket.on('GAME_START', (msg) => {
  console.log('GAME_START')
  socket.emit('GET_PLAYER', {
    playerUUID: sessionStorage.getItem("playerUUID"),
    gameUUID: sessionStorage.getItem("gameUUID")
  })
});

socket.on('PLAYER_DATA', (msg) => {
  player = msg

  socket.emit('GET_OPPONENT', {
    playerUUID: sessionStorage.getItem("playerUUID"),
    gameUUID: sessionStorage.getItem("gameUUID")
  })
});

socket.on('OPPONENT_DATA', (msg) => {
  opponent = msg
  socket.emit('READY', {
    playerUUID: sessionStorage.getItem("playerUUID"),
    gameUUID: sessionStorage.getItem("gameUUID")
  })
});

socket.on('DUEL_START', (msg) => {
  console.log('DUEL_START')
  document.querySelector("header").textContent = "Game start"
  document.querySelector(".player .pokemon__name").textContent = player.team[player.activePokemonIndex].name;
  document.querySelector(".opponent .pokemon__name").textContent = opponent.team[opponent.activePokemonIndex].name;

  player.team[player.activePokemonIndex].moves.forEach(move => {
    let moveElement = document.createElement("div")
    moveElement.classList.add("moves__move")
    moveElement.textContent = move.name
    moveElement.addEventListener("click", () => {
      console.log("send ?")
      socket.emit('ROUND_INSTRUCTION', {
        playerUUID: sessionStorage.getItem("playerUUID"),
        gameUUID: sessionStorage.getItem("gameUUID"),
        type: 'MOVE',
        instruction: move.name,
      })
    })
    movesContainer.appendChild(moveElement)
  });

  player.team.forEach(pokemon => {
    let pokemonContainer = document.createElement("div")
    pokemonContainer.textContent = pokemon.name
    pokemonContainer.classList.add("team__pokemon")

    pokemonContainer.addEventListener("click", () => {
      if(pokemon.name === player.team[player.activePokemonIndex].name) return
      selectedSwitchPokemon = pokemon.name
      document.querySelectorAll(".team__pokemon--selected").forEach(team__pokemon => {
        team__pokemon.classList.remove("team__pokemon--selected")
      })
      pokemonContainer.classList.add("team__pokemon--selected")
    })

    switchBox__team.appendChild(pokemonContainer)
  })
});