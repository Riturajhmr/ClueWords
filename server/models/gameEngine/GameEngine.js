const Team = require("./Team");
const Player = require("./Player");
const Card = require("./Card");
const getRandomNumber = require("./utils/randomNumber");
const shuffle = require("./utils/shuffle");
const getGameId = require("./utils/getGameId");
const { words } = require("./utils/words");
const Redis = require("ioredis");
const config = require("../../config");

// Redis connection for game state management
const redis = new Redis(config.redis);

/**
 * GameEngine - Core game logic handler
 * Manages game state, board creation, team management, and game flow
 */
class GameEngine {
  constructor(data = null) {
    if (!data) {
      this.id = getGameId();
      this.redTeam = new Team("red");
      this.blueTeam = new Team("blue");
      this.teamList = {};
      this.board = this.createBoard();
      this.startingTeam = getRandomNumber(2) === 0 ? "blue" : "red";
      this.turn = this.startingTeam;
      this.players = [];
      this.host = null;
      this.gameStatus = "setup";
      this.endGame = {};
    } else {
      this.id = data.id;
      this.redTeam = new Team(
        data.redTeam.name,
        data.redTeam.players,
        data.redTeam.points,
      );
      this.blueTeam = new Team(
        data.blueTeam.name,
        data.blueTeam.players,
        data.blueTeam.points,
      );
      this.board = data.board;
      this.turn = data.turn;
      this.startingTeam = data.startingTeam;
      this.teamList = data.teamList;
      this.players = data.players;
      this.host = data.host;
      this.gameStatus = data.gameStatus;
      this.endGame = data.endGame;
    }
  }

  /**
   * Retrieve game state from Redis
   * @param {string} id - Game ID
   * @returns {GameEngine|null} Game instance or null if not found
   */
  static async getGame(id) {
    try {
      const response = await redis.get(id);
      if (!response) {
        return null;
      }
      return new this(JSON.parse(response));
    } catch (err) {
      console.error("Error retrieving game from Redis:", err);
      return null;
    }
  }

  /**
   * Delete game from Redis
   * @param {string} id - Game ID
   * @returns {boolean} Success status
   */
  static async deleteGame(id) {
    try {
      await redis.del(id);
      return true;
    } catch (err) {
      console.error("Error deleting game from Redis:", err);
      return false;
    }
  }

  /**
   * Save current game state to Redis
   * @returns {boolean} Success status
   */
  async save() {
    try {
      await redis.set(this.id, JSON.stringify(this));
      return true;
    } catch (err) {
      console.error("Error saving game to Redis:", err);
      return false;
    }
  }

  /**
   * Get the current game board
   * @returns {Array<Card>} Array of card objects
   */
  getBoard() {
    return this.board;
  }

  /**
   * Create a randomized game board with 25 words
   * Distribution: 9 cards for starting team, 8 for other team,
   * 7 innocent cards, 1 assassin card
   * @returns {Array<Card>} Shuffled array of 25 cards
   */
  createBoard() {
    const randWords = shuffle(words).slice(0, 25);
    const board = [];
    let cardType;

    for (let i = 1; i <= 25; i++) {
      if (i <= 9) {
        cardType = this.startingTeam === "blue" ? "blue" : "red";
        board.push(new Card(randWords[i - 1], cardType));
      } else if (i <= 17) {
        cardType = this.startingTeam === "blue" ? "red" : "blue";
        board.push(new Card(randWords[i - 1], cardType));
      } else if (i <= 24) {
        cardType = "innocent";
        board.push(new Card(randWords[i - 1], cardType));
      } else {
        cardType = "assassin";
        board.push(new Card(randWords[i - 1], cardType));
      }
    }

    return shuffle(board);
  }

  /**
   * Assign a player to a team
   * @param {Object} player - Player object with id and name
   * @param {string} team - Team name ('red' or 'blue')
   */
  assignTeam({ id, name }, team) {
    switch (team) {
      case this.redTeam.name:
        this.redTeam.addPlayer(new Player(id, name, team));
        break;
      case this.blueTeam.name:
        this.blueTeam.addPlayer(new Player(id, name, team));
        break;
      default:
        return null;
    }
  }

  /**
   * Assign role to a player (spy-master or guesser)
   * @param {string} playerId - Player ID
   * @param {string} role - Role ('spy-master' or 'guesser')
   */
  assignRole(playerId, role) {
    this.redTeam.players.forEach((item) => {
      if (item.id === playerId) {
        item.setRole(role);
      }
    });

    this.blueTeam.players.forEach((item) => {
      if (item.id === playerId) {
        item.setRole(role);
      }
    });
  }

  createTeamList(redTeam, blueTeam) {
    let blueList = blueTeam.reduce(
      (obj, player) => {
        if (player.role === "guesser") {
          obj["guesser"].push(player.name);
          return obj;
        } else {
          obj["spyMaster"] = player.name;
          return obj;
        }
      },
      { guesser: [] },
    );

    let redList = redTeam.reduce(
      (obj, player) => {
        if (player.role === "guesser") {
          obj["guesser"].push(player.name);
          return obj;
        } else {
          obj["spyMaster"] = player.name;
          return obj;
        }
      },
      { guesser: [] },
    );

    this.teamList = {
      blue: blueList,
      red: redList,
    };
  }
  /**
   * Set the game host
   * @param {Object} user - User object
   */
  setHost(user) {
    this.host = user;
  }

  /**
   * Get all current players in the game
   * @returns {Array} Array of player objects
   */
  getCurrentPlayers() {
    return this.players;
  }

  /**
   * Add a new player to the game
   * Prevents duplicate entries
   * @param {Object} user - User object with id and name
   * @returns {Array} Updated players array
   */
  joinGame(user) {
    if (this.players.length === 0) {
      this.players.push(user);
      return this.players;
    }

    // To avoid duplication
    const result = this.players.find(
      (player) => player.id.toString() === user.id.toString(),
    );
    if (!result) {
      this.players.push(user);
    }

    return this.players;
  }

  /**
   * Start the game - change status from 'setup' to 'running'
   */
  startGame() {
    this.gameStatus = "running";
  }

  /**
   * Reset game to initial state
   * Creates new board and resets teams
   */
  resetGame() {
    this.redTeam = new Team("red");
    this.blueTeam = new Team("blue");
    this.board = this.createBoard();
    this.turn = "blue";
  }

  /**
   * Switch turn between teams
   */
  changeTurn() {
    if (this.turn == "blue") {
      this.turn = "red";
    } else {
      this.turn = "blue";
    }
  }

  /**
   * Handle card selection by a player
   * Updates game state based on card type (red, blue, innocent, assassin)
   * @param {string} team - Team making the move
   * @param {number} cardIndex - Index of the selected card
   */
  pickCard(team, cardIndex) {
    let cardType = this.board[cardIndex].type;
    this.board[cardIndex].clicked = true;

    switch (cardType) {
      case "assassin":
        this.gameOver(
          team === this.redTeam.name ? this.blueTeam.name : this.redTeam.name,
          "assassin",
        );
        break;
      case "innocent":
        this.changeTurn();
        break;
      case "red":
        this.redTeam.addPoint();
        if (team !== this.redTeam.name) {
          this.changeTurn();
        }
        break;
      case "blue":
        this.blueTeam.addPoint();
        if (team !== this.blueTeam.name) {
          this.changeTurn();
        }
        break;
      default:
        return false;
    }

    this.gameDecision();
  }

  /**
   * End the game and set winner
   * @param {string} winner - Winning team ('red' or 'blue')
   * @param {string} method - How game ended ('assassin', 'lastCard', 'manual')
   */
  gameOver(winner, method) {
    const capitalizeWinner = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
    switch (method) {
      case "assassin":
        if (winner === "red") {
          this.endGame.winner = capitalizeWinner(this.redTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.blueTeam.name,
          )} team picked the assassin`;
        } else {
          this.endGame.winner = capitalizeWinner(this.blueTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.redTeam.name,
          )} team picked the assassin`;
        }
        break;
      case "lastCard":
        if (winner === "red") {
          this.endGame.winner = capitalizeWinner(this.redTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.redTeam.name,
          )} found all of their cards`;
        } else {
          this.endGame.winner = capitalizeWinner(this.blueTeam.name);
          this.endGame.gameOverText = `${capitalizeWinner(
            this.blueTeam.name,
          )} found all of their cards`;
        }
        break;
      case "manual":
        this.endGame.winner = "No";
        this.endGame.gameOverText = "Host has ended game early";
        break;
      default:
        return null;
    }

    this.gameStatus = "over";
  }

  /**
   * Check if either team has reached winning score
   * Automatically ends game if condition is met
   */
  gameDecision() {
    const winningScoreRed = this.startingTeam === "red" ? 9 : 8;
    const winningScoreBlue = this.startingTeam === "red" ? 9 : 8;

    if (this.redTeam.points === winningScoreRed) {
      this.gameOver(this.redTeam.name, "lastCard");
    } else if (this.blueTeam.points === winningScoreBlue) {
      this.gameOver(this.blueTeam.name, "lastCard");
    }
  }

  /**
   * Reset game for a new round
   * Keeps same players but resets board, scores, and status
   */
  playAgain() {
    this.redTeam.resetPoints();
    this.blueTeam.resetPoints();
    this.redTeam.resetPlayers();
    this.blueTeam.resetPlayers();
    this.board = this.createBoard();
    this.gameStatus = "setup";
    this.startingTeam = getRandomNumber(2) === 0 ? "blue" : "red";
    this.turn = this.startingTeam;
  }
}

module.exports = GameEngine;
