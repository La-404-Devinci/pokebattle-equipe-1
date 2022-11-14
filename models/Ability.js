module.exports =
class Ability {
  id;
  name;
  flavoirText   // description
  constructor(id, name, flavoirText){
    this.id = id;
    this.name = name;
    this.flavoirText = flavoirText;
  }
}