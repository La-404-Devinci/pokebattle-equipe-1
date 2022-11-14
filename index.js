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

let game

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

io.on('connection', (socket) => {
  console.log(game)
  socket.on('message', (message) => {
    console.log(socket.id)
    switch (message.eventName) {
      case 'CONNECTION':
        game.getPlayerByName(message.pseudo).socketId = socket.id
        break
    }
  })
})

// app.listen(PORT,() => {
//   console.log(`Running on PORT ${PORT}`);
// })

server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`)
})
