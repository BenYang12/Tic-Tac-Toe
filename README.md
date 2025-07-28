# Tic-Tac-Toe

A browser-based Tic-Tac-Toe game built with **HTML**, **CSS**, and **JavaScript**, following best practices from The Odin Project. I used **factory functions**, the **module pattern (IIFE)**, and **DOM manipulation**.

---

## 🧠 Features

- Two-player gameplay (Player X vs Player O)
- Displays current player turn and detects win/draw conditions
- Resets the game board
- Clean UI with a retro-inspired font

---

## 🧱 Technologies Used

- HTML5  
- CSS3  
- JavaScript 

---
## 🧩 Architecture Breakdown

- **Gameboard Module (IIFE):**
  - Stores the board state (array of 9 cells)
  - Provides methods to update or reset the board

- **Player Factory:**
  - Creates player objects with name and marker (X or O)

- **Game Controller Module (IIFE):**
  - Handles game flow (turns, win/draw checking)
  - Communicates with the Gameboard and DOM

- **Display Controller Module (IIFE):**
  - Updates UI elements (status messages, board rendering)
  - reflects the game state

---

## 🎨 Font & Styling

This project uses [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) from Google Fonts to give it a classic, retro arcade feel.



