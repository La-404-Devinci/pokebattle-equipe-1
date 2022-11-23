"use strict"

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const Player = require('./models/Player');
const Game = require('./models/Game');
const Pokemon = require('./models/Pokemon');
const Action = require('./models/Action');

const p1 = require('./placeholders').p1;
const p2 = require('./placeholders').p2;

const io = new Server(server)
const PORT = process.env.PORT || 3000

let game = new Game();
// game.addPlayer(p1)
// game.addPlayer(p2)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

.get('/public/*', (req, res) => {
  res.sendFile(__dirname + req.path)
})

// game
.post('/game', (req, res) => {
  if (!game) game = new Game()

  // if(game.players.length >= 2) {
  //   res.send("game full")
  //   return;
  // }

  const newPlayer = new Player(req.body.pseudo)
  game.addPlayer(newPlayer)
  res.sendFile(__dirname + '/public/pages/game.html')
})

// game
.post('/gameTest', (req, res) => {
  if (!game) game = new Game()

  // if(game.players.length >= 2) {
  //   res.send("game full")
  //   return;
  // }

  const newPlayer = new Player(req.body.pseudo)
  game.addPlayer(newPlayer)
  res.sendFile(__dirname + '/public/pages/gameTest.html')

  if(game.players.length === 2) {
    // Start of the game
    
  }
})

.get('/setup', (req, res) => {
  res.sendFile(__dirname + '/public/pages/setup.html')
})

.post('/join', (req, res) => {
  console.log("/join")
  if(!game) console.log("Creating new game")
  if(!game) game = new Game()
  if(game.players.length >= 2) {
    // res.header.
    res.send("game full")
    return;
  }

  console.log(req.body)
  return
  // placeholders 
  // let player = p1
  // if(game.players.length === 1) player = p2
  
  player.gameUUID = game.uuid;
  game.addPlayer(player)
  res.json({
    playerUUID: player.uuid,
    gameUUID: game.uuid,
  })
})

.get('/duel', (req, res) => {
  res.sendFile(__dirname + '/public/pages/duel.html')
})


io.on('connection', (socket) => {
  console.log(io.engine.clientsCount)
  if(io.engine.clientsCount === 2 && !game.hasStarted) {
    game.hasStarted = true
    io.emit("GAME_START", game)
  }
  
  socket.on('ROUND_INSTRUCTION', (message) => {
    if(game.deathSwitchWaitList.deathSwitchWaitList.length > 0 && game.deathSwitchWaitList.isActive) {
      console.log("// waiting for switch after death")
      return
    } // waiting for switch after death
    let player = game.getPlayerByUUID(message.playerUUID)
    if(!player) return
    if(player.action) return
    player.action = new Action(message.type, message.moveName, message.pokemonToSwitchName)
    console.log("player action")
    if(!(game.players[0].action && game.players[1].action)) return
    console.log("proceed turn")
    game.proceedTurn()
    io.emit('ROUND_DATA', game)
    game.roundDatas = []
    // io.emit()
    game.deathSwitchWaitList.isActive = true
    if(game.deathSwitchWaitList.deathSwitchWaitList.length > 0) {
      io.emit('DEATH_SWITCH', {
        playerRequestedToSwitch: game.deathSwitchWaitList.deathSwitchWaitList
      })
    }
  })

  socket.on('DEATH_SWITCH', (message) => {
    console.log('DEATH_SWITCH')
    console.log(game.deathSwitchWaitList.deathSwitchWaitList.length)
    game.getPlayerByUUID(message.playerUUID).switch(message.pokemonToSwitchName)
    game.deathSwitchWaitList.deathSwitchWaitList.splice(game.deathSwitchWaitList.deathSwitchWaitList.indexOf(game.getPlayerByUUID(message.playerUUID)))
    io.emit('DEATH_SWITCHED', game)
  });

  socket.on("disconnect", (reason) => {
    if(io.engine.clientsCount === 0) {
      game = null;
      console.log("No player remaining, game destroy")
    }
  });
})

server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`)
})
