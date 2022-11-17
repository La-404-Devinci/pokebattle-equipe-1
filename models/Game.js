const { v4 } = require('uuid')
const { getRandomInt } = require('./../utils')

module.exports = 
class Game {
  uuid;
  players;
  hasStarted;
  readyPlayerCount;
  roundDatas;

  table = {
    normal: {
        rock: 0.5,
        spectre: 0,
        acier: 0.5
    },
    fire: {
        feu: 0.5,
        water: 0.5,
        plante: 2,
        ice: 2,
        bug:2,
        rock: 0.5,
        dragon: 0.5,
        acier: 2
    },
    water: {
        fire: 2,
        water: 0.5,
        plante: 0.5,
        ground: 2,
        rock: 2,
        dragon: 0.5
    },
    plante: {
        fire: 0.5,
        water: 2,
        plante: 0.5,
        poison: 0.5,
        ground: 2,
        vol: 0.5,
        bug: 0.5,
        rock: 2,
        dragon: 0.5,
        acier: 0.5
    },
    electrik: {
        water: 2,
        plante: 0.5,
        electrik: 0.5,
        ground: 0,
        vol: 2,
        dragon: 0.5
    },
    ice: {
        fire: 0.5,
        water: 0.5,
        plante: 2,
        ice: 0.5,
        ground: 2,
        vol: 2,
        dragon: 2
    },
    fight: {
        normal: 2,
        ice: 2,
        poison: 0.5,
        vol: 0.5,
        psy: 0.5,
        bug: 0.5,
        rock: 2,
        spectre: 0,
        tenebre: 2,
        acier: 2,
        fairy: 0.5
    },
    poison: {
        plante: 2,
        poison: 0.5,
        ground: 0.5,
        rock: 0.5,
        spectre: 0.5,
        acier: 0,
        fairy: 2
    },
    ground: {
        fire: 2,
        plante: 0.5,
        electrik: 2,
        poison: 2,
        vol: 0,
        bug: 0.5,
        rock: 2,
        acier: 2
    },
    vol: {
        plante: 2,
        electrik: 0.5,
        fight: 2,
        bug: 2,
        rock: 0.5,
        acier: 0.5
    },
    psy: {
        fight: 2,
        poison: 2,
        psy: 0.5,
        tenebre: 0,
        acier: 0.5
    }
}

  constructor(){
    this.uuid = v4();
    this.players = []
    this.hasStarted = false;
    this.readyPlayerCount = 0;
    this.roundDatas = [];
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
            if(this.players[0].team[this.players[0].activePokemonIndex].stats.speed > this.players[1].team[this.players[1].activePokemonIndex].stats.speed) {
              this.executeInstruction(this.players[0])
              this.executeInstruction(this.players[1])
            } else if(this.players[0].team[this.players[0].activePokemonIndex].stats.speed < this.players[1].team[this.players[1].activePokemonIndex].stats.speed) {
              this.executeInstruction(this.players[1])
              this.executeInstruction(this.players[0])
            } else { // speed tie
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
    this.players[0].action = null;
    this.players[1].action = null;
  }

  setActionsMove() {
    this.players.forEach(player => {
      player.action.move = player.team[player.activePokemonIndex].moves.find(move => move.name === player.action.moveName)
    })
  }

  executeInstruction(player) {
    console.log(`${player.name} action`)
    let playerActionData = {};
    console.log(player.name)
    switch(player.action.type) {
      case 'SWITCH':
        player.switch(player.action.pokemonToSwitchName)
        playerActionData.type = 'SWITCH';
        playerActionData.switchedPokemonIndex = player.activePokemonIndex;
        playerActionData.playerUUID = player.uuid;
        break;
      case 'MOVE':
        playerActionData.type = 'MOVE';
        playerActionData.playerUUID = player.uuid;
        playerActionData.team = player.team;
        console.log(player.action.moveName)
        this.useMove(player.team[player.activePokemonIndex], player.action.moveName, this.getOpponentByPlayerUUID(player.uuid).team[this.getOpponentByPlayerUUID(player.uuid).activePokemonIndex])
        // 
        // update client team too
        break;
    }
    this.roundDatas.push(playerActionData)
  }

  useMove(sender, moveName, receiver) { // receiver
    if(sender.stats.hp.current <=0) return // pokemon dead
    console.log(sender)
    console.log(sender.getMoveByName(moveName))
    let move = sender.getMoveByName(moveName)
    if(move.damageClass === 'status') {

    } else { // damage atk
      let level = 50;
      let power = move.power;
      let a;
      let d;
      if(move.damageClass === 'physical') {
        a = sender.getRealStat(sender.stats.atk);
        d = receiver.getRealStat(sender.stats.def);
      } else {
        a = sender.getRealStat(sender.stats.speAtk);
        d = receiver.getRealStat(sender.stats.speDef);
      }
      console.log(a)
      let target = 1; // 1V1 mode only
      let weather = 1; // not implemented
      let badge = 1; // no need
      let critical = 1; // not implemented
      let random = 1 - getRandomInt(16) / 100;
      let stab;
      if(sender.getTypeByName(move.type)) stab = 1.5;
      else stab = 1;
      let typeEffectiveness = 1; // todo
      let burn = 1; // not implemented
      let other = 1; // not implemented and todo (inchallah)

      let damages = ( ( ( ( ( ( 2 * level ) / 5 ) + 2 ) * power * ( a / d ) ) / 50 ) + 2 ) * target * weather * badge * critical * random * stab * typeEffectiveness * burn * other
      console.log(`${sender.name} send `)
      console.log(damages)
      console.log(`to ${receiver.name}`)
      receiver.stats.hp.current -= damages
    }
  }

  getTypeEffectivness(atkTypeName, receiverTypeNames) {
    let multiplier = 1;
    receiverTypeNames.forEach(typeName => {
        if(this.table[atkTypeName][typeName]) multiplier *= this.table[atkTypeName][typeName]
    });
    console.log("multiplier", multiplier)
    return multiplier
  }
}
