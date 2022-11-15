"use strict"

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const Player = require('./models/Player');
const Game = require('./models/Game');
const Pokemon = require('./models/Pokemon');

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
  if(!game) game = new Game()
  if(game.players.length >= 2) {
    // res.header.
    res.send("game full")
    return;
  }
  let player = p1
  if(game.players.length === 1) player = p2
  
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
    io.emit("GAME_START")
    game.hasStarted = true
  }

  socket.on('GET_PLAYER', (message) => {
    let player = game.getPlayerByUUID(message.playerUUID)
    if(!player) return
    socket.emit('PLAYER_DATA', player)
  })

  socket.on('GET_OPPONENT', (message) => {
    let player = game.getPlayerByUUID(message.playerUUID)
    if(!player) return
    socket.emit('OPPONENT_DATA', game.getOpponentByPlayerUUID(message.playerUUID))
  })

  socket.on('READY', (message) => {
    game.readyPlayerCount +=1
    if(game.readyPlayerCount === 2) {
      io.emit('DUEL_START')
    }
  })
  
  socket.on('ROUND_INSTRUCTION', (message) => {
    if(!game.getPlayerByUUID(message.playerUUID)) return
    if(game.getPlayerByUUID(message.playerUUID).action) return
    game.getPlayerByUUID(message.playerUUID).action = message
    console.log("player action")
    if(!(game.players[0].action && game.players[0].action)) return
    console.log("proceed turn")
    game.proceedTurn()
  })
})

// app.listen(PORT,() => {
//   console.log(`Running on PORT ${PORT}`);
// })

server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`)
})
