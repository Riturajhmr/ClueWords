class Team {
  constructor(name, players = [], points = 0) {
    this.name = name;
    this.players = players;
    this.points = points;
  }

  addPoint() {
    this.points += 1;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getName() {
    return this.name;
  }

  resetPoints() {
    this.points = 0;
  }
  resetPlayers() {
    this.players = [];
  }
}

module.exports = Team;
