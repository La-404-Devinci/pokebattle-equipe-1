const { v4 } = require('uuid')

module.exports = 
class Player {
  name;
  team;
  gameUUID;
  uuid;
  activePokemonIndex;
  constructor(PlayerName, team){
    this.name = PlayerName;
    this.uuid = v4();
    this.team = team;
    this.activePokemonIndex = 0;
  }

  setTeam(team) // Array of pkms representing the player team
  {
    this.team = [...team]
  }
}
