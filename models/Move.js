module.exports =
class Move {
  id;
  name;
  damageClass; // status, physical, special
  flavoirText   // description
  power;
  accuracy;
  pp;
  priority;
  target;   // single-target, ennemy zone, everyone but sender...
  type;
  constructor(id, name, damageClass, flavoirText, power, accuracy, pp, priority, target, type){
    this.id = id;
    this.name = name;
    this.damageClass = damageClass;
    this.flavoirText = flavoirText;
    this.power = power;
    this.accuracy = accuracy;
    this.pp = pp;
    this.priority = priority;
    this.target = target;
    this.type = type;
  }
}