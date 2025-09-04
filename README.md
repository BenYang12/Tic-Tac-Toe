# Tic Tac Toe 🎮

A browser-based Tic Tac Toe game built with **JavaScript**, **Webpack**, **Jest (TDD)**, and the **Module Pattern**.  
The game supports two players, custom names, win/tie detection, restart functionality, and fetches a celebration GIF from the **Giphy API** when a player wins.

---

## 🚀 Features
- Classic **3×3 Tic Tac Toe** gameplay.
- **Two players** with custom or default names.
- Real-time **game status updates** (turn tracking, win/tie messages).
- **Restart button** to reset the game without refreshing.
- Fun **celebration GIF** via [Giphy API](https://developers.giphy.com/) when a player wins.
- Clean, responsive **UI with CSS Flexbox & Grid**.
- **Test-Driven Development** using Jest for game logic.
- Organized with the **Module Pattern** for loosely coupled code

---

## 🛠️ Tech Stack
- HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- Webpack (bundling, asset management)
- Jest (unit testing)
- ESLint (linting / code quality)

# 📂 Project Structure
├── index.js # Entry point, event listeners
├── gameBoard.js # Manages board state
├── gameController.js # Controls game flow & rules
├── createPlayer.js # Factory for player objects
├── displayController.js # Handles DOM updates
├── styles.css # Styling
├── template.html # HTML template
├── *.test.js # Jest test files
└── .eslintrc.json # ESLint configuration


---

# ▶️ How to Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/tic-tac-toe.git
   cd tic-tac-toe
npm install
npm run dev
npm test

