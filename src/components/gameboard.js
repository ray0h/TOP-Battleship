import Ship from "./ships";

const Gameboard = () => {

  let shipArray = [];
  let boardArray = Array(100);

  function placeShip(coord) {
    let isAlreadyOccupied = false;
    
    coord.forEach(coord => {
      if (boardArray[coord]) {
        isAlreadyOccupied = true;
      };
    });

    if (!isAlreadyOccupied) {
      let id = shipArray.length + 1;
      let newShip = Ship(id, coord);
      shipArray.push(newShip);
      coord.forEach(coord => boardArray[coord] = id);
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
    boardArray,
    shipArray,
    placeShip,
    receiveAttack,
    allShipsSunk
  };
};

export default Gameboard;