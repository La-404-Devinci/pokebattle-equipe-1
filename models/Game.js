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

  proceedTurn() {
    this.players.forEach(player => {
      switch(player.action.type) {
        case 'FORFEIT':
          player.action.priority = 2
          break;
        case 'SWITCH':
          player.action.priority = 1
          break;
        case 'SWITCH':
          player.action.priority = 0
          break;
      }
      console.log(player.action)
    })
    if( this.players[0].action.priority === 2 ||
        this.players[1].action.priority === 2) {
          // someone ff
    } else {
      if(this.players[0].action.priority > this.players[1].action.priority) {
        // execute p1 action
        console.log("// execute p1 action")
      } else if (this.players[0].action.priority < this.players[1].action.priority) {
        // execute p2 action
        console.log("// execute p2 action")
      } else { // action priority equal but not 2
        if( this.players[0].action.priority === 1 &&
            this.players[1].action.priority === 1) { // double switch
          // execute p1 or p2 switch randomly
          console.log("// execute p1 or p2 switch randomly")
        } else { // double move
          // execute p1 or p2 move by move.priority
          console.log("// execute p1 or p2 move by move.priority")
        }
      }
    }
    
  }
}
