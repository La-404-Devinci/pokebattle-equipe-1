module.exports =
class Pokemon {
  name;
  stats;
  moves;
  ability;
  item;
  stats;
  types;
  constructor(name, types, stats, moves, ability, item){
    this.name = name;
    this.types = types;
    this.stats = stats
    this.moves = moves;
    this.ability = ability;
    this.item = item;
  }
}
