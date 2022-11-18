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

  getMoveByName(moveName) {
    return this.moves.find(move => move.name === moveName)
  }

  getTypeByName(typeName) {
    return this.types.find(type => type === typeName)
  }

  getRealStat(stat) {
    let multiplier;
    switch(stat.modifier) {
      case -6:
        multiplier = 0.25
        break;
      case -5:
        multiplier = 0.28
        break;
      case -4:
        multiplier = 0.33
        break;
      case -3:
        multiplier = 0.4
        break;
      case -2:
        multiplier = 0.5
        break;
      case -1:
        multiplier = 0.66
        break;
      case 0:
        multiplier = 1
        break;
      case 1:
        multiplier = 1.5
        break;
      case 2:
        multiplier = 2
        break;
      case 3:
        multiplier = 2.5
        break;
      case 4:
        multiplier = 3
        break;
      case 5:
        multiplier = 3.5
        break;
      case 6:
        multiplier = 4
        break;
      default:
        multiplier = 1
    }
    return multiplier * stat.base
  }
}
