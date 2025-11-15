# CodeWords - Multiplayer Word Game 🎮

CodeWords is an exciting multiplayer word guessing game for 4-8 players. Two teams compete in a strategic battle of wits where spymasters provide one-word clues to help their teammates identify their team's words on the board, while avoiding the opponent's words and the deadly assassin card.

Built with modern web technologies including **Node.js, Express.js, React.js, Socket.io, MongoDB, Redis, and AWS S3** for a seamless real-time gaming experience.

![CodeWords](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

## 🚀 Features

- **Real-time Multiplayer Gaming** - Play with friends in real-time using Socket.io
- **Team-based Strategy** - Two teams (Red and Blue) compete in a battle of wits
- **Spymaster & Guesser Roles** - Different roles for strategic gameplay
- **Email Invitations** - Invite friends via email or shareable links
- **User Profiles** - Customizable profiles with image uploads to AWS S3
- **Turn Timer** - Time-limited turns (60 seconds) for exciting gameplay
- **In-game Chat** - Communicate with your team during the game
- **Responsive Design** - Beautiful UI that works on all devices
- **Game State Management** - Redis-powered caching for fast game state updates
- **Play Again** - Reset and replay games with the same players

## 🛠️ Tech Stack

### Frontend
- **React.js** (v16.13.1) - UI framework
- **Material-UI** (v4.11.0) - Component library
- **Socket.io-client** (v2.3.0) - Real-time communication
- **Axios** (v0.20.0) - HTTP client
- **React Router** (v5.2.0) - Routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.16.1) - Web framework
- **Socket.io** (v2.3.0) - WebSocket server
- **MongoDB** with **Mongoose** (v5.10.6) - Database
- **Redis** with **ioredis** (v4.17.3) - Caching and game state
- **JWT** with **Passport.js** (v0.4.1) - Authentication
- **AWS S3** - Image storage
- **SendGrid** (v7.2.6) - Email service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Redis** (local installation or Redis Cloud account)
- **AWS Account** (for S3 bucket - optional, for profile images)
- **SendGrid Account** (optional, for email invitations)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd team-dragon-dev
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

## ⚙️ Configuration

1. **Create Environment File**
   
   Navigate to the `server` directory and create a `.env` file. You can copy from `env.example`:
   ```bash
   cd server
   cp env.example .env
   ```

2. **Configure Environment Variables**
   
   Open `server/.env` and fill in the following:

   ```env
   # Application Environment
   NODE_ENV=development
   PORT=3001
   SECRET_KEY=your-secret-key-here-change-in-production

   # Database Configuration
   # Local MongoDB: mongodb://localhost:27017/codewords
   # MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/codewords
   DB_URI=mongodb://localhost:27017/codewords
   TEST_DB_URI=mongodb://localhost:27017/codewords-test

   # Redis Configuration
   # Local Redis: redis://localhost:6379
   # Redis Cloud: redis://username:password@host:port
   REDIS_URI=redis://localhost:6379

   # AWS S3 Configuration (for profile image uploads)
   AWS_ACCESS_KEY=your-aws-access-key
   AWS_SECRET=your-aws-secret-key
   AWS_BUCKET_NAME=codewords

   # SendGrid Configuration (for email invitations)
   SENDGRID_API_KEY=your-sendgrid-api-key
   # Domain for email invites (no trailing slash)
   DOMAIN=http://localhost:3000
   ```

3. **Setup MongoDB**
   
   - **Local**: Ensure MongoDB is running on your machine
   - **Atlas**: Create a cluster and get your connection string

4. **Setup Redis**
   
   - **Local**: Install and start Redis server
   - **Cloud**: Sign up for Redis Cloud and get your connection URI

5. **Setup AWS S3** (Optional)
   
   - Create an S3 bucket named `codewords` (or your preferred name)
   - Create an IAM user with S3 permissions
   - Add access key and secret to `.env`

6. **Setup SendGrid** (Optional)
   
   - Create a SendGrid account
   - Generate an API key
   - Add to `.env`

## 🚀 Running the Application

### Development Mode

1. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:3001`

2. **Start the Client** (in a new terminal)
   ```bash
   cd client
   npm start
   ```
   The client will start on `http://localhost:3000` and automatically open in your browser

### Production Mode

1. **Build the Client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the Server**
   ```bash
   cd server
   npm start
   ```

## 🎮 How to Play

1. **Register/Login** - Create an account or sign in to your existing account
2. **Create Game** - Host a new game or join via shareable link/email invitation
3. **Invite Players** - Send email invitations or share the game link (4-8 players total)
4. **Setup Teams** - Assign players to Red and Blue teams
5. **Assign Roles** - Choose spymasters and guessers for each team
6. **Play** - Spymasters give clues, guessers make moves
7. **Win** - First team to find all their words wins!

### Game Rules

- **Board Setup**: 25 word cards are randomly arranged on the board
- **Card Distribution**:
  - Starting team: 9 cards
  - Other team: 8 cards
  - Innocent (neutral): 7 cards
  - Assassin: 1 card (game ends immediately if selected)
- **Spymasters** can see all word colors and give one-word clues with a number
- **Guessers** can only see grey words and must guess based on clues
- **Turn Timer**: 60 seconds per turn
- **Winning**: First team to find all their words wins!

## 📁 Project Structure

```
team-dragon-dev/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/       # Reusable UI components
│       │   ├── Board/        # Game board components
│       │   ├── GameBar/      # Game navigation bar
│       │   ├── Messenger/    # In-game chat
│       │   ├── NavBar/       # Main navigation
│       │   └── ...
│       ├── contexts/         # React Context providers
│       │   ├── UserContext.js
│       │   ├── GameContext.js
│       │   └── ...
│       ├── pages/            # Main page components
│       │   ├── Landing/      # Home page
│       │   ├── Login/        # Login page
│       │   ├── Register/     # Registration page
│       │   ├── Game/         # Game page
│       │   └── ...
│       ├── themes/           # Material-UI theme
│       └── socket.js         # Socket.io client setup
│
└── server/                   # Node.js backend
    ├── bin/
    │   └── www               # Server entry point
    ├── config/               # Configuration files
    │   ├── index.js          # Environment config
    │   └── passport.js       # Passport strategy
    ├── controllers/          # Business logic
    │   ├── auth.js           # Authentication
    │   ├── game.js           # Game management
    │   ├── profile.js        # User profiles
    │   └── email.js          # Email invitations
    ├── middleware/           # Express middleware
    │   └── uploadImage.js    # S3 image upload
    ├── models/               # Database models
    │   ├── User.js           # User model
    │   ├── Game.js           # Game model
    │   └── gameEngine/       # Game logic engine
    │       ├── GameEngine.js # Core game logic
    │       ├── Team.js       # Team management
    │       ├── Player.js     # Player management
    │       ├── Card.js       # Card model
    │       ├── Timer.js      # Turn timer
    │       └── utils/        # Utility functions
    ├── routes/               # API routes
    │   ├── auth.js
    │   ├── game.js
    │   ├── profile.js
    │   └── email.js
    ├── validations/           # Input validation
    │   ├── login.js
    │   └── register.js
    ├── socket.js             # Socket.io handlers
    ├── app.js                # Express app setup
    └── env.example           # Environment template
```

## 🔧 Development

### Available Scripts

**Server:**
- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run debug` - Start server with debugger

**Client:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **JSDoc** comments for documentation

## 🐛 Troubleshooting

### Common Issues

1. **OpenSSL Error (Node.js 17+)**
   - The client already includes `NODE_OPTIONS=--openssl-legacy-provider` in the start script
   - If issues persist, create `.env` file in client directory with:
     ```env
     NODE_OPTIONS=--openssl-legacy-provider
     ```

2. **Port Already in Use**
   - Change `PORT` in server `.env` file
   - Update `proxy` in `client/package.json` to match new port

3. **MongoDB Connection Error**
   - Verify `DB_URI` in `.env` is correct
   - Ensure MongoDB is running (local) or cluster is accessible (Atlas)
   - Check network connectivity

4. **Redis Connection Error**
   - Verify `REDIS_URI` in `.env` is correct
   - Ensure Redis is running (local) or service is accessible (cloud)
   - In development, the app will continue without Redis (with warnings)

5. **AWS S3 Upload Fails**
   - Verify AWS credentials in `.env`
   - Check bucket name matches `AWS_BUCKET_NAME`
   - Ensure bucket has public read permissions for uploaded images
   - Verify IAM user has S3 write permissions

6. **Email Invitations Not Sending**
   - Verify `SENDGRID_API_KEY` in `.env`
   - Check SendGrid account status
   - Verify sender email is verified in SendGrid
   - Check `DOMAIN` is set correctly (no trailing slash)

7. **Socket.io Connection Issues**
   - Ensure server is running before starting client
   - Check CORS settings if accessing from different domain
   - Verify authentication token is valid

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use strong, unique `SECRET_KEY` in production
- Keep dependencies updated for security patches
- Use HTTPS in production
- Validate all user inputs
- Use environment variables for all sensitive data

## 📝 License

This project is private and proprietary.

## 👤 Author

**Rituraj**

## 🙏 Acknowledgments

Built with modern web technologies and best practices for a seamless gaming experience.

---

**Enjoy playing CodeWords!** 🎉

