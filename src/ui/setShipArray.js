const setShipArray = (board) => {

  // get location of all ships/ship squares from rendered board
  const ships = document.querySelectorAll(".dragMe");
  let finalShips = [];

  ships.forEach(ship => {
    let shipArray = [];
    const shipLength = ship.id.slice(6,7);
    const shipOrient = ship.id.slice(7,8);
    const shipLocation = Number(ship.id.match(/^((?!offset\d+).)+/g)[0].slice(8));
    for (let i = 0; i < shipLength; i++) {
      (shipOrient === "h") 
        ? shipArray.push(shipLocation + i) 
        : shipArray.push(shipLocation + i*10); 
    };
    finalShips.push(shipArray);
  });

  // add final ship locations to gameboard
  finalShips.forEach(ship => board.placeShip(ship));
  board.boardArray.forEach((boardSquare, index) => {
    const renderedSquare = document.getElementById(`p1Board-${index}`);
    if (typeof(boardSquare) === "number") {
      renderedSquare.classList.add("ship");
    };
  });
};

export default setShipArray;