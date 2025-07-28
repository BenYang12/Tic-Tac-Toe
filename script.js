//store gameboard as an array inside of a Gameboard objejct. Here, I will wrap this factory function inside an IIFE (module pattern)
//intuitively, i think gameboard factory should have methods to get, update, and reset
//closures will make this possible
const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];//board state is private here because I made it a private variable
  const getBoard = () => [...board];//get the board

  const reset = () => {//reset the board
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const placeMarker = function (index, marker) {//update the board
    if (board[index] === "") {
      //if space at that index is open...
      board[index] = marker;//place it with the current player's marker
      return true;
    } else {
      return false;//if it's not open, return false, we will use this return value in GameController
    }
  };
  return { getBoard, reset, placeMarker };//I will let board remain private
})();

//Player factory function
const createPlayer = function (name, marker) {
  return { name, marker };
};

//game controller IIFE, i need an object to control the flow of the game
const GameController = (function () {
  let player1, player2;
  let currentPlayer;
  let isOver = false;
  let winner = null;

  const startGame = function (name1 = "Player 1", name2 = "Player 2") {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    currentPlayer = player1;
    winner = null;
    isOver = false;
    Gameboard.reset();
  };

  const playTurn = function (index) {
    if (isOver || !Gameboard.placeMarker(index, currentPlayer.marker)) {
      //exit playTurn() early if game is over or if someone tries to place their marker in a taken cell
      return;
    }

    if (checkWinner()) {//function below
      isOver = true;
      winner = currentPlayer;
    } else if (Gameboard.getBoard().every((square) => square !== "")) {
      //if entire board is filled w/ player markers
      isOver = true; //this is for tie scenario
    } else {
      switchPlayer(); //next turn, function below
      //if isOver is false, turns won't switch until current player makes a valid move
    }
  };

  const checkWinner = function () {//hardest part, use .some() and .every()
    const board = Gameboard.getBoard();
    const winCombinations = [//use index
      [0, 1, 2], // row win combos
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // column win combos
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // 2 diagonal win combos
      [2, 4, 6],
    ];
    return winCombinations.some((combo) =>
      combo.every((index) => board[index] === currentPlayer.marker)//some() checks if at least one element in an array passes some test
    );
  };

  const switchPlayer = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;//simple 
  };

  const getGameState = function () {
    return { board: Gameboard.getBoard(), currentPlayer, isOver, winner };
  };

  const resetGame = function () {
    Gameboard.reset();
    currentPlayer = player1;
    winner = null;
    isOver = false;
  };
  return { playTurn, getGameState, resetGame, startGame };
})();

//now that console logic is solid i will begin rendering the board visually
//i'm not modifying the game state, only reflecting it
const DisplayController = (function () {
  const boardContainer = document.querySelector(".board"); //board container is essentially the board area in html document
  const render = function () {
    //to fix bug of board clumping up I need to clear board everytime I render
    boardContainer.textContent = "";
    const { board, currentPlayer, winner, isOver } =
      GameController.getGameState();//make sure to get the most updated board along with everything else

    board.forEach((cell, index) => {
      //for each "cell" in our array, this is essentially pointing to each "space" in the tic tac toe board
      const cellBtn = document.createElement("button"); //create button
      cellBtn.classList.add("cell"); //add a class to manipulate with css later
      cellBtn.textContent = cell; //add the original text of the list index to the button, at first, this will be just empty
      cellBtn.dataset.index = index; 

      cellBtn.addEventListener("click", () => {
        //key part
        GameController.playTurn(index);
        render();
      });

      boardContainer.appendChild(cellBtn);
    });

    updateStatus(currentPlayer, winner, isOver);
  };

  const updateStatus = (currentPlayer, winner, isOver) => {
    const status = document.querySelector(".status");
    if (isOver) {
      restartBtn.style.display = "block";//show restart button when game is over
      status.textContent = winner ? `${winner.name} wins!` : "It's a draw!";
    } else {
      status.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;//case where switchplayer is called
    }
  };
  return { render };
})();

const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", () => {
  const name1 = document.querySelector("#player1").value || "Player 1"; //take the user inputted name or have it be Player 1 or 2 by default
  const name2 = document.querySelector("#player2").value || "Player 2";
  GameController.startGame(name1, name2);
  DisplayController.render();
});



const restartBtn = document.querySelector("#restartBtn");
restartBtn.addEventListener("click", () => {
  GameController.resetGame();//reset 
  DisplayController.render();//then immedietley render
  restartBtn.style.display = "none";//forgot to hide restart button after
});
