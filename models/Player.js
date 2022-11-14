module.exports = 
class Player {
  name;
  team;
  playerUUID;
  constructor(PlayerName, team, playerUUID){
    this.name = PlayerName;
    this.team = team;
    this.playerUUID = playerUUID;
  }

  setTeam(team) // Array of pkms representing the player team
  {
    this.team = [...team]
  }
}
