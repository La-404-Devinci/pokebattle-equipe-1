const Player = require('./Player').Player

module.exports = {
  Game: class Game {
    constructor (firstPlayer) {
      this.players = []
    }

    addPlayer (player) {
      this.players.push(player)
    }

    getPlayerByName (name) {
      return this.players.find(player => player.name === name)
    }

    getPlayerBySocketId (socketId) {
      return this.players.find(player => player.name === socketId)
    }
  }
}
