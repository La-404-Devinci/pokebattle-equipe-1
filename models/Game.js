const { v4 } = require('uuid')
const { getRandomInt } = require('./../utils')

module.exports = 
class Game {
  uuid;
  players;
  hasStarted;
  readyPlayerCount;
  roundDatas;
  deathSwitchWaitList = []; // represente list of user who need to send new pokemon bcause dead
  table = {
    normal: {
      rock: 0.5,
      ghost: 0,
      steel: 0.5
    },
    fire: {
      feu: 0.5,
      water: 0.5,
      grass: 2,
      ice: 2,
      bug:2,
      rock: 0.5,
      dragon: 0.5,
      steel: 2
    },
    water: {
      fire: 2,
      water: 0.5,
      grass: 0.5,
      ground: 2,
      rock: 2,
      dragon: 0.5
    },
    grass: {
      fire: 0.5,
      water: 2,
      grass: 0.5,
      poison: 0.5,
      ground: 2,
      flying: 0.5,
      bug: 0.5,
      rock: 2,
      dragon: 0.5,
      steel: 0.5
    },
    electric: {
      water: 2,
      grass: 0.5,
      electric: 0.5,
      ground: 0,
      flying: 2,
      dragon: 0.5
    },
    ice: {
      fire: 0.5,
      water: 0.5,
      grass: 2,
      ice: 0.5,
      ground: 2,
      flying: 2,
      dragon: 2
    },
    fighting: {
      normal: 2,
      ice: 2,
      poison: 0.5,
      flying: 0.5,
      psychic: 0.5,
      bug: 0.5,
      rock: 2,
      ghost: 0,
      dark: 2,
      steel: 2,
      fairy: 0.5
    },
    poison: {
      grass: 2,
      poison: 0.5,
      ground: 0.5,
      rock: 0.5,
      ghost: 0.5,
      steel: 0,
      fairy: 2
    },
    ground: {
      fire: 2,
      grass: 0.5,
      electric: 2,
      poison: 2,
      flying: 0,
      bug: 0.5,
      rock: 2,
      steel: 2
    },
    flying: {
      grass: 2,
      electric: 0.5,
      fighting: 2,
      bug: 2,
      rock: 0.5,
      steel: 0.5
    },
    psychic: {
      fighting: 2,
      poison: 2,
      psychic: 0.5,
      dark: 0,
      steel: 0.5
    },
    bug: {
      fire: 0.5,
      grass: 2,
      fighting: 0.5,
      poison: 0.5,
      flying: 0.5,
      psychic: 2,
      ghost: 0.5,
      dark: 2,
      steel: 0.5,
      fairy: 0.5
    },
    rock: {
      fire: 2,
      ice: 2,
      fighting: 0.5,
      ground: 0.5,
      flying: 2,
      bug: 2,
      steel: 0.5
    },
    ghost: {
      normal: 0,
      psychic: 2,
      ghost: 2,
      dark: 0.5
    },
    dragon: {
      dragon: 2,
      steel: 0.5,
      fairy: 0
    },
    dark: {
      fighting: 0.5,
      psychic: 2,
      ghost: 2,
      dark: 0.5,
      fairy: 0.5
    },
    steel: {
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      ice: 2,
      rock: 2,
      steel: 0.5,
      fairy: 2
    },
    fairy: {
      fire: 0.5,
      fighting: 2,
      poison: 0.5,
      dragon: 2,
      dark: 2,
      steel: 0.5
    },
    unknown: {},
    shadow: {}
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

  getPlayerByPokemon(pokemon) {
    return this.players.find(player => player.team.find(pokemonT => pokemonT === pokemon))
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
    if(sender.stats.hp.current <= 0) return // pokemon dead
    let move = sender.getMoveByName(moveName)
    // todo test préci
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
      let target = 1; // 1V1 mode only
      let weather = 1; // not implemented
      let badge = 1; // no need
      let critical = 1; // not implemented
      let random = 1 - getRandomInt(16) / 100;
      let stab;
      if(sender.getTypeByName(move.type)) stab = 1.5;
      else stab = 1;
      let typeEffectiveness = this.getTypeEffectivness(move.type, receiver.types);
      let burn = 1; // not implemented
      let other = 1; // not implemented and todo - les objets (inchallah)

      let damages = ( ( ( ( ( ( 2 * level ) / 5 ) + 2 ) * power * ( a / d ) ) / 50 ) + 2 ) * target * weather * badge * critical * random * stab * typeEffectiveness * burn * other
      damages = Math.round(damages)
      console.log(`${sender.name} send `)
      console.log(damages)
      console.log(`to ${receiver.name}`)
      receiver.stats.hp.current -= damages
      if(receiver.stats.hp.current <= 0) {
        this.deathSwitchWaitList.push(this.getPlayerByPokemon(receiver))
        console.log("deathSwitchWaitList", this.deathSwitchWaitList)
      }
    }
  }

  getTypeEffectivness(atkTypeName, receiverTypeNames) {
    let multiplier = 1;
    receiverTypeNames.forEach(typeName => {
      if(typeof this.table[atkTypeName][typeName] === "number") multiplier *= this.table[atkTypeName][typeName];
    });
    return multiplier
  }
}
