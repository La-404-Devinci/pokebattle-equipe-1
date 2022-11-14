module.exports =
class Item {
  id;
  name;
  flavoirText   // description
  constructor(id, name, flavoirText){
    this.id = id;
    this.name = name;
    this.flavoirText = flavoirText;
  }
}