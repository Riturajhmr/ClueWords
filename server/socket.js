const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("./models/User");
const Game = require("./models/Game");
const GameEngine = require("./models/gameEngine/GameEngine");
const Timer = require("./models/gameEngine/Timer");
const cookie = require("cookie");

/**
 * Socket.io configuration and event handlers
 * Manages real-time game communication, player connections, and game state updates
 * @param {Object} server - HTTP server instance
 */
module.exports = (server) => {
  const io = require("socket.io")(server);
  
  // In-memory storage for active connections
  const clientDetails = {}; // Maps socket.id to user info
  const roomDetails = {};   // Maps gameId to room info (messages, clients, timer)

  io.use(function (socket, next) {
    if (socket.handshake.headers && socket.handshake.headers.cookie) {
      const token = cookie.parse(socket.handshake.headers.cookie).token;
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {

    // Socket listener for game rooms
    socket.on("join-game", async (recv) => {
      const token = cookie.parse(socket.handshake.headers.cookie).token;
      const { gameId } = recv;
      const errors = [];
      try {
        const game = await Game.findOne({ gameId });
        if (!game) {
          errors.push({
            name: "UndefinedError",
            message: "Game not created yet",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Game not created");
        }

        const decoded = jwt.verify(token, config.secret);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          errors.push({
            name: "NotFoundError",
            message: "Email id does not exist!",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Email id does not exist in database");
        }

        // Joining room
        socket.join(gameId);

        // create room details if does not exist
        if (roomDetails[gameId] === undefined) {
          roomDetails[gameId] = {
            messages: [],
            clients: [socket.id],
            timer: new Timer(io, gameId),
          };
        } else {
          const isClient = (el) => el === socket.id;
          if (roomDetails[gameId].clients.findIndex(isClient) == -1) {
            roomDetails[gameId].clients.push(socket.id);
          }
        }

        // assign user a name and store user details
        if (clientDetails[socket.id] === undefined) {
          clientDetails[socket.id] = {
            name: decoded.name,
            rooms: [gameId],
          };
        }

        const newPlayer = {
          id: user.id,
          name: user.name,
        };

        const currentGame = await GameEngine.getGame(gameId);
        if (!currentGame) {
          errors.push({
            name: "UndefinedError",
            message: "Game not found",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Game does not Exist");
        }

        currentGame.joinGame(newPlayer);
        await currentGame.save();

        io.to(gameId).emit("update-players", currentGame);
      } catch (err) {
        console.error(err);
      }
    });

    // Receive assigned roles emitted from FE
    socket.on("start-game", async (recv) => {
      const { gameId, players } = recv;
      const errors = [];

      try {
        const currentGame = await GameEngine.getGame(gameId);
        if (!currentGame) {
          errors.push({
            name: "UndefinedError",
            message: "Game not found",
          });
          io.to(socket.id).emit("error", errors);
          throw new Error("Game does not exist!");
        }

        players.forEach(({ id, name, team, spyMaster }) => {
          // Assign team to each player
          currentGame.assignTeam({ id, name }, team);

          // Assign role to each player
          if (!spyMaster) {
            currentGame.assignRole(id, "guesser");
          } else {
            currentGame.assignRole(id, "spy-master");
          }
        });

        // Team List for Display
        currentGame.createTeamList(
          currentGame.redTeam.players,
          currentGame.blueTeam.players,
        );

        currentGame.startGame();
        await currentGame.save();

        // start the turn timer
        if (roomDetails[gameId] && roomDetails[gameId].timer) {
          roomDetails[gameId].timer.start();
        }

        io.to(gameId).emit("update-roles", currentGame);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("init-game", async (recv, fn) => {
      const { gameId } = recv;

      // Check if clientDetails exists
      if (!clientDetails[socket.id]) {
        return fn({ error: "Client not found. Please join the game first." });
      }

      // Check if roomDetails exists
      if (!roomDetails[gameId]) {
        return fn({ error: "Room not found. Please join the game first." });
      }

      // update room of joining client
      const alert = {
        sender: "alert",
        message: `${clientDetails[socket.id].name} joined the game`,
      };

      roomDetails[gameId].messages.push(alert);
      socket.to(gameId).broadcast.emit("new-message", alert);

      // return assigned name and chat messages
      fn({
        name: clientDetails[socket.id].name,
        state: await GameEngine.getGame(gameId),
        messages: roomDetails[gameId].messages,
      });
    });

    // Socket listener for messenger
    socket.on("message", (recv) => {
      const { gameId, msgData } = recv;

      // Check if room exists
      if (!roomDetails[gameId]) {
        console.error(`Room ${gameId} not found for message`);
        return;
      }

      // save message into messages
      roomDetails[gameId].messages.push(msgData);

      // update other clients with the message
      io.to(gameId).emit("new-message", msgData);
    });

    // Socket listener for next move
    socket.on("move", async (recv) => {
      const { gameId, currentTurn, cardIndex } = recv;

      const currentGame = await GameEngine.getGame(gameId);
      if (!currentGame) {
        io.to(socket.id).emit("error", { message: "Game not found" });
        return;
      }

      currentGame.pickCard(currentTurn, cardIndex); // Result of the move would be in console for now
      await currentGame.save();

      // reset timer if turn changed
      if (currentGame.turn !== currentTurn) {
        if (roomDetails[gameId] && roomDetails[gameId].timer) {
          roomDetails[gameId].timer.start();
        }
      }

      io.to(gameId).emit("update-game", currentGame);
    });

    socket.on("change-turn", async (recv) => {
      const { gameId } = recv;

      // Check if room exists
      if (!roomDetails[gameId]) {
        io.to(socket.id).emit("error", { message: "Room not found" });
        return;
      }

      // Stop the timer
      if (roomDetails[gameId].timer) {
        roomDetails[gameId].timer.stop();
      }

      const currentGame = await GameEngine.getGame(gameId);
      if (!currentGame) {
        io.to(socket.id).emit("error", { message: "Game not found" });
        return;
      }

      currentGame.changeTurn();
      await currentGame.save();

      // Restart the timer
      if (roomDetails[gameId].timer) {
        roomDetails[gameId].timer.start();
      }

      io.to(gameId).emit("update-game", currentGame);
    });

    // Listener to end game
    socket.on("end-game", async (recv) => {
      const { gameId, winner, method } = recv;

      const currentGame = await GameEngine.getGame(gameId);
      if (!currentGame) {
        io.to(socket.id).emit("error", { message: "Game not found" });
        return;
      }

      currentGame.gameOver(winner, method);
      await currentGame.save();

      // Stop the timer
      if (roomDetails[gameId] && roomDetails[gameId].timer) {
        roomDetails[gameId].timer.stop();
      }

      io.to(gameId).emit("update-game", currentGame);
    });

    //Play again
    socket.on("play-again", async (gameId) => {
      const currentGame = await GameEngine.getGame(gameId);
      if (!currentGame) {
        io.to(socket.id).emit("error", { message: "Game not found" });
        return;
      }
      
      currentGame.playAgain();
      await currentGame.save();

      io.to(gameId).emit("play-again", currentGame);
    });

    // Listener to regularly update game
    socket.on("fetch-game", async (recv) => {
      const { gameId } = recv;
      const currentGame = await GameEngine.getGame(gameId);
      if (currentGame) {
        io.to(gameId).emit("update-game", currentGame);
      }
    });

    // Clean up when a user disconnects
    socket.on("disconnect", () => {
      // lookup the disconnecting user and remove
      const user = clientDetails[socket.id];
      if (user !== undefined) {
        user.rooms.forEach(async (room) => {
          // Check if room exists
          if (!roomDetails[room]) {
            return;
          }

          const alert = {
            sender: "alert",
            message: `${user.name} left the game`,
          };

          roomDetails[room].messages.push(alert);
          roomDetails[room].clients = roomDetails[room].clients.filter(
            (client) => client !== socket.id,
          );

          // delete the room if all clients are gone
          if (!roomDetails[room].clients.length) {
            if (roomDetails[room].timer) {
              roomDetails[room].timer.stop();
            }
            delete roomDetails[room];
            await GameEngine.deleteGame(room);
          }

          io.to(room).emit("new-message", alert);
        });

        // remove client data from socket
        delete clientDetails[socket.id];
      }
    });
  });
};
