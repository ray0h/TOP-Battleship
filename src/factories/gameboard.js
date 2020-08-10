import Ship from "./ships";

const Gameboard = (boardId) => {

  let shipArray = [];
  let boardArray = Array(100);

  function placeShip(coords) {
    let isAlreadyOccupied = false;
    
    coords.forEach(coord => {
      if (boardArray[coord]) {
        isAlreadyOccupied = true;
      };
    });

    if (!isAlreadyOccupied) {
      let id = shipArray.length + 1;
      let newShip = Ship(id, coords);
      shipArray.push(newShip);
      coords.forEach(coord => boardArray[coord] = id);
    };
  };

  function receiveAttack(coord) {
    if(boardArray[coord] === "miss" || boardArray[coord] === "hit") {
      return;
    } else if(boardArray[coord] === undefined) {
      boardArray[coord] = "miss";
    } else {
      let hitShip = shipArray[boardArray[coord]-1];
      hitShip.hit(coord);
      boardArray[coord] = "hit";
    }
  };

  function allShipsSunk() {
    return shipArray.map(ship => ship.isSunk()).every(isSunk => isSunk === true);
  };

  return {
    boardId,
    boardArray,
    shipArray,
    placeShip,
    receiveAttack,
    allShipsSunk
  };
};

export default Gameboard;