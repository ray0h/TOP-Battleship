import render from "./render";

const gameplay = (player1, player2, p1Board, p2Board) => {

  let coordinates;
  let renderBoard = render();

  player1.setTurn(true);
  player2.setTurn(false);

  const isThereWinner = () => {
    if (p1Board.allShipsSunk()) {
      return "player2";
    } else if (p2Board.allShipsSunk()) {
      return "player1";
    } else {
      return false
    };
  };

  const wait = (ms) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(ms)
      }, ms)
    });
  };

  async function playRound(event) {
    // if winner, gameplay disabled
    if (!isThereWinner()) {
      coordinates = Number(event.target.id.slice(8));

      // ignore previous moves
      if (p2Board.boardArray[coordinates] === "miss" || p2Board.boardArray[coordinates] === "hit") {
        return;
      };

      player1.attack(p2Board, coordinates);
      renderBoard.update(p2Board);

      // skip p2 computer turn if p1 gets hit
      if (p2Board.boardArray[coordinates] === "hit") {
        if (isThereWinner()) {
          renderBoard.message(`${isThereWinner()} won the game!`)
        };
        return;
      };

      player1.setTurn(false);
      player2.setTurn(true);

      // p2 computer coordinates are random moves
      coordinates = Math.floor(Math.random() * 100);
      player2.attack(p1Board, coordinates);
      await(wait(500));
      renderBoard.update(p1Board);  
      if (isThereWinner()) {
        renderBoard.message(`${isThereWinner()} won the game!`)
      };

      // skip p1's turn if getting hits
      while (p1Board.boardArray[coordinates] === "hit") {
        coordinates = Math.floor(Math.random() * 100);
        player2.attack(p1Board, coordinates);
        await(wait(500));
        renderBoard.update(p1Board); 
        if (isThereWinner()) {
          renderBoard.message(`${isThereWinner()} won the game!`)
        };
      };

      player1.setTurn(true);
      player2.setTurn(false);
    };
  };

  renderBoard.update(p1Board);

  const board = document.getElementById("p2Board");
  board.onclick=playRound;
};

export default gameplay;