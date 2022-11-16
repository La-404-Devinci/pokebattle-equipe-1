module.exports =
class Action {
  type;
  move;
  priority;
  moveName;
  pokemonToSwitchName;
  constructor(type, moveName, pokemonToSwitchName){
    this.type = type;
    this.moveName = moveName;
    this.pokemonToSwitchName = pokemonToSwitchName;
  }
}