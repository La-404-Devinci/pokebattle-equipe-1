export function removeChilds(parent) {
    while(parent.firstElementChild) parent.firstElementChild.remove()
}
export function getPlayerByUUID(playerUUID, players) {
    return players.find(player => player.uuid === playerUUID);
}
export function getOpponentByPlayerUUID(playerUUID, players) {
    console.log("getOpponentByPlayerUUID");
    return players.find(player => player.uuid !== playerUUID);
}
export function updatePlayer(player) {
    let playerUi = document.querySelector(".player");
    let pokemon = player.team[player.activePokemonIndex]
    playerUi.querySelector(".pokemon__name").textContent = pokemon.name
    playerUi.querySelector(".pokemon__hp").textContent = pokemon.stats.hp.current
    let playerUIMovesContainer = playerUi.querySelector(".pokemon__moves")
    removeChilds(playerUIMovesContainer)
    pokemon.moves.forEach(move => {
        console.log(window.waitingDeathSwitch)
        if(window.waitingDeathSwitch) return
        let moveElement = document.createElement("div")
        moveElement.classList.add("moves__move")
        moveElement.textContent = move.name
        moveElement.addEventListener("click", () => {
            console.log("send ?")
            window.socket.emit('ROUND_INSTRUCTION', {
              playerUUID: sessionStorage.getItem("playerUUID"),
              gameUUID: sessionStorage.getItem("gameUUID"),
              type: 'MOVE',
              moveName: move.name,
            })
        })
        playerUIMovesContainer.appendChild(moveElement)
    });
}
export function updateOpponent(opponent) {
    console.log("updateOpponent()");
    let opponentUi = document.querySelector(".opponent");
    let pokemon = opponent.team[opponent.activePokemonIndex]
    opponentUi.querySelector(".pokemon__name").textContent = pokemon.name
    opponentUi.querySelector(".pokemon__hp").textContent = pokemon.stats.hp.current
}
export function updateBothPlayers(players) {
    updatePlayer(getPlayerByUUID(sessionStorage.getItem("playerUUID"), players));
    updateOpponent(getOpponentByPlayerUUID(sessionStorage.getItem("playerUUID"), players));
}

export function updateTeamUi(player) {
    let switchBox__team = document.querySelector(".switchBox__team")
    removeChilds(switchBox__team)
    player.team.forEach(pokemon => {
        let pokemonContainer = document.createElement("div")
        pokemonContainer.textContent = pokemon.name
        pokemonContainer.classList.add("team__pokemon")
    
        pokemonContainer.addEventListener("click", () => {
          if(pokemon.name === player.team[player.activePokemonIndex].name) return
          window.selectedSwitchPokemon = pokemon.name
          document.querySelectorAll(".team__pokemon--selected").forEach(team__pokemon => {
            team__pokemon.classList.remove("team__pokemon--selected")
          })
          pokemonContainer.classList.add("team__pokemon--selected")
        })
    
        switchBox__team.appendChild(pokemonContainer)
    })
}

export function updateGame(game) {
    updateBothPlayers(game.players)
    updateTeamUi(getPlayerByUUID(sessionStorage.getItem("playerUUID"), game.players))
}