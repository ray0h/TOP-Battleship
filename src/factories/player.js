const Player = () => {
  let isTurn = true;

  function setTurn(bool) {
    isTurn = bool;
  };

  function getTurn() {
    return isTurn;
  };

  function attack(enemyBoard, coord) {
    if (isTurn) {
      enemyBoard.receiveAttack(coord);
    };
  };

  function randomAttack(enemyBoard) {
    if (isTurn) {
      let coord = Math.floor(Math.random()*100);
      while (enemyBoard.boardArray[coord] === "miss" || enemyBoard.boardArray[coord] === "hit") {
        coord = Math.floor(Math.random()*100);
      }
      enemyBoard.receiveAttack(coord);
    }
  }

  return {
    getTurn,
    setTurn,
    attack,
    randomAttack,
  }
};

export default Player;