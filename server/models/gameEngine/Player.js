class Player {
  constructor(id, name, team, role = "") {
    this.id = id;
    this.name = name;
    this.team = team;
    this.role = role;
  }

  getTeam() {
    return this.team;
  }

  getId() {
    return this.id;
  }

  setRole(role) {
    this.role = role;
  }
  getRole() {
    return this.role;
  }
}

module.exports = Player;
