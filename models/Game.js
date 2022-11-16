const { v4 } = require('uuid')
const { getRandomInt } = require('./../utils')

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
      console.log(player.action)
      switch(player.action.type) {
        case 'FORFEIT':
          player.action.priority = 2
          break;
        case 'SWITCH':
          player.action.priority = 1
          break;
        case 'MOVE':
          player.action.priority = 0
          break;
      }
      console.log(player.action.priority)
    })
    if( this.players[0].action.priority === 2 ||
        this.players[1].action.priority === 2) {
          // someone ff ==> terminer la game
    } else {
      if(this.players[0].action.priority > this.players[1].action.priority) {
        // execute p1 action first
        this.executeInstruction(this.players[0])
        this.executeInstruction(this.players[1])
        console.log("// execute p1 action")
      } else if (this.players[0].action.priority < this.players[1].action.priority) {
        // execute p2 action first
        this.executeInstruction(this.players[1])
        this.executeInstruction(this.players[0])
        console.log("// execute p2 action")
      } else { // action priority equal but not 2
        if( this.players[0].action.priority === 1 &&
            this.players[1].action.priority === 1) { // double switch
          // execute p1 or p2 switch randomly
          console.log("// execute p1 or p2 switch randomly")
          if(getRandomInt(2) === 0) {
            this.executeInstruction(this.players[0])
            this.executeInstruction(this.players[1])
          } else {
            this.executeInstruction(this.players[1])
            this.executeInstruction(this.players[0])
          }
        } else { // double move
          // execute p1 or p2 move by move.priority
          console.log("// execute p1 or p2 move by move.priority")
          this.setActionsMove()
          if(this.players[0].action.move.priority > this.players[1].action.move.priority) {
            this.executeInstruction(this.players[0])
            this.executeInstruction(this.players[1])
          } else if (this.players[0].action.move.priority < this.players[1].action.move.priority) {
            this.executeInstruction(this.players[1])
            this.executeInstruction(this.players[0])
          } else { // same move priority
            if(getRandomInt(2) === 0) {
              this.executeInstruction(this.players[0])
              this.executeInstruction(this.players[1])
            } else {
              this.executeInstruction(this.players[1])
              this.executeInstruction(this.players[0])
            }
          }
        }
      }
    }
  }

  setActionsMove() {
    this.players.forEach(player => {
      player.action.move = player.team[player.activePokemonIndex].moves.find(move => move.name === player.action.moveName)
    })
  }

  executeInstruction(player) {
    console.log(player.name)
  }
}
