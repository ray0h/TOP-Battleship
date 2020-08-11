import Player from "./factories/player";
import Gameboard from "./factories/gameboard";
import randomShipArray from "./factories/randomShipArray";
import setShipArray from "./ui/setShipArray";
import gameplay from "./ui/gameplay";
import render from "./ui/render";
import "regenerator-runtime/runtime";

const renderBoard = render();
// same button used to start / reset game
let btn = document.getElementById("gameBtn");

const setupGame = () => {

  const player1 = Player();
  const player2 = Player();
  
  let p1Board = Gameboard("p1Board");
  const p2Board = Gameboard("p2Board");
  
  let p1Ships = randomShipArray();
  let p2Ships = randomShipArray();
  // let p1Ships = [
  //   [0,1,2,3,4],
  //   [60, 70, 80, 90],
  //   [7,8,9],
  //   [79,89,99],
  //   [28,29]
  // ]
  p2Ships.forEach(ship => p2Board.placeShip(ship));
  renderBoard.initializeBoards();
  renderBoard.makeDraggableShips(p1Ships);

  btn.onclick = () => {
    setShipArray(p1Board);
    renderBoard.clearDraggableShips(p1Ships);
    btn.textContent = "Reset Game";
    renderBoard.message("");
    playGame(player1, player2, p1Board, p2Board);
  };
};

const playGame = (player1, player2, p1Board, p2Board) => {
  btn.onclick = () => {
    btn.textContent="Play Game"
    renderBoard.message("Place Ships (dbl click to rotate)");
    setupGame();
  };
  gameplay(player1, player2, p1Board, p2Board);
};

setupGame();