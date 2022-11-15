const { v4 } = require('uuid')

module.exports = 
class Game {
  uuid;
  players;
  hasStarted;
  readyPlayerCount;
  constructor(){
    this.uuid = v4();
    this.players = []
    this.hasStarted = false;
    this.readyPlayerCount = 0;
  }

  addPlayer(player){
    this.players.push(player)
  }

  getPlayerByName(name){
    return this.players.find(player => player.name == name)
  }

  getPlayerByUUID(uuid){
    return this.players.find(player => player.uuid == uuid)
  }

  getOpponentByPlayerUUID(uuid){
    return this.players.find(player => player.uuid !== uuid)
  }
}
