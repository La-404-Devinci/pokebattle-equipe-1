module.exports =
class Action {
  type;
  move;
  priority;
  moveName;
  constructor(type, moveName){
    this.type = type;
    this.moveName = moveName;
  }
}