module.exports = 
class Player {
  name;
  team;
  socketId;
  constructor(PlayerName, team, socketId){
    this.name = PlayerName;
    this.team = team;
    this.socketId = socketId;
  }

  setTeam(team) // Array of pkms representing the player team
  {
    this.team = [...team]
  }
}
