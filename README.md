# CodeWords - Multiplayer Word Game 🎮

CodeWords is an exciting multiplayer word guessing game for 4-8 players. Two teams compete in a strategic battle of wits where spymasters provide one-word clues to help their teammates identify their team's words on the board, while avoiding the opponent's words and the deadly assassin card.

Built with modern web technologies including **Node.js, Express.js, React.js, Socket.io, MongoDB, Redis, and AWS S3** for a seamless real-time gaming experience.

## 🚀 Features

- **Real-time Multiplayer Gaming** - Play with friends in real-time using Socket.io
- **Team-based Strategy** - Two teams compete in a battle of wits
- **Spymaster & Guesser Roles** - Different roles for strategic gameplay
- **Email Invitations** - Invite friends via email or shareable links
- **User Profiles** - Customizable profiles with image uploads
- **Turn Timer** - Time-limited turns for exciting gameplay
- **In-game Chat** - Communicate with your team during the game
- **Responsive Design** - Beautiful UI that works on all devices

## 📦 Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd team-dragon-dev
   ```

2. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

## ⚙️ Configuration

1. Create a file with filename `.env` in server directory OR copy the file `env.example` from server directory and rename it to `.env`. `env.example` already contains the required variables, you just need to configure them.

2. Configure the application environment:
   ```env
   # Misc
   NODE_ENV=development
   PORT=3001
   SECRET_KEY=your-secret-key-here
   ```

3. Configure the database URI:
   ```env
   # Database
   DB_URI=mongodb://localhost:27017/codewords
   # Or use MongoDB Atlas
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/codewords
   ```

4. Configure Redis:
   ```env
   # Redis
   REDIS_URI=redis://localhost:6379
   # Or use Redis Cloud
   REDIS_URI=redis://username:password@host:port
   ```

5. Configure SendGrid (for email invitations):
   ```env
   # SendGrid
   SENDGRID_API_KEY=your-sendgrid-api-key
   DOMAIN=http://localhost:3000
   ```

6. Configure AWS S3 (for profile images):
   ```env
   # AWS S3
   AWS_ACCESS_KEY=your-aws-access-key
   AWS_SECRET=your-aws-secret-key
   AWS_BUCKET_NAME=codewords
   ```

## 🚀 Running the Application

Once all the `.env` variables are configured:

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

## 🎮 How to Play

1. **Register/Login** - Create an account or sign in
2. **Create Game** - Host a new game or join via link/email
3. **Setup Teams** - Assign players to Red and Blue teams
4. **Assign Roles** - Choose spymasters and guessers for each team
5. **Play** - Spymasters give clues, guessers make moves
6. **Win** - First team to find all their words wins!

### Game Rules

- **Spymasters** can see all word colors and give clues
- **Guessers** can only see grey words and must guess based on clues
- Each team has 9 words to find (starting team) or 8 words (other team)
- Avoid the **assassin** card - it ends the game immediately!
- Turn timer: 60 seconds per turn

## 🛠️ Tech Stack

- **Frontend:** React.js, Material-UI, Socket.io-client, Axios
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis (ioredis)
- **Storage:** AWS S3
- **Email:** SendGrid
- **Authentication:** JWT, Passport.js

## 📁 Project Structure

```
team-dragon-dev/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── contexts/    # React Context providers
│   │   ├── pages/       # Main page components
│   │   └── themes/      # Material-UI theme
│   └── public/          # Static assets
│
└── server/              # Node.js backend
    ├── controllers/     # Business logic
    ├── models/          # Database models & game engine
    ├── routes/          # API routes
    ├── socket.js        # Socket.io handlers
    └── config/          # Configuration files
```

## 🔧 Development

### Available Scripts

**Server:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code

**Client:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code

## 🐛 Troubleshooting

### Common Issues

1. **OpenSSL Error (Node.js 17+)**
   - Create `.env` file in client directory with: `NODE_OPTIONS=--openssl-legacy-provider`

2. **Port Already in Use**
   - Change PORT in server `.env` file
   - Update proxy in `client/package.json`

3. **MongoDB Connection Error**
   - Check DB_URI in `.env`
   - Ensure MongoDB is running

4. **Redis Connection Error**
   - Check REDIS_URI in `.env`
   - Ensure Redis is running

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for a seamless gaming experience.
