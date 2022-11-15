"use strict"

    let player;
    let opponent;
    const socket = io()

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
    });

    setInterval(() => {
      socket.emit('ROUND_INSTRUCTION', {
        playerUUID: sessionStorage.getItem("playerUUID"),
        gameUUID: sessionStorage.getItem("gameUUID"),
        type: "SWITCH"
      })
    }, 1000)