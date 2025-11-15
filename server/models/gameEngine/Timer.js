const GameEngine = require("./GameEngine");

// Turn duration in seconds
const TURN_TIME = 60;

/**
 * Timer class for managing turn time limits
 * Automatically switches turns when time expires
 */
class Timer {
  constructor(io, gameId) {
    this.timerId;
    this.timeRemaining = TURN_TIME;
    this.io = io;
    this.gameId = gameId;
  }

  /**
   * Start the turn timer
   * Emits countdown ticks and handles time-out
   */
  start() {
    clearInterval(this.timerId);
    this.timeRemaining = TURN_TIME;
    this.timerId = setInterval(async () => {
      if (this.timeRemaining < 0) {
        this.io.to(this.gameId).emit("time-out");
        this.stop();

        let currentGame = await GameEngine.getGame(this.gameId);
        if (!currentGame) {
          // Game doesn't exist, stop timer
          this.stop();
          return;
        }
        
        currentGame.changeTurn();
        await currentGame.save();

        this.io.to(this.gameId).emit("update-game", currentGame);
        this.start();
      } else {
        this.io.to(this.gameId).emit("tick", this.timeRemaining);
        this.timeRemaining--;
      }
    }, 1000);
  }

  /**
   * Stop the timer and reset countdown
   */
  stop() {
    clearInterval(this.timerId);
    this.timeRemaining = TURN_TIME;
  }
}

module.exports = Timer;
