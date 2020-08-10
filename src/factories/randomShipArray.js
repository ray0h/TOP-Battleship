const randomShipArray = () => {

  const newShip = (length) => {
    return {
      orientation: randomOrient(),
      length,
    };
  };

  const randomOrient = () => {
    const flip = Math.round(Math.random());
    return (flip === 0) ? "h" : "v";
  };

  // define number and lengths of ships
  const shipClasses = [5, 4, 3, 3, 2];
  const fleet = shipClasses.map(length => newShip(length));

  // generate position array
  const grid = Array(100).fill(null);
  let randomFleetPosition = [];

  fleet.forEach(ship => {
    let isNotClear = true;
    let coordsNotValid = true;
    let newShip;

    while (isNotClear || coordsNotValid) {
      coordsNotValid = true;
      newShip = [];

      // generate ship coordinates
      const randomCoordinates = Math.floor(Math.random()*100);
      for (let i = 0; i < ship.length; i++) {
        if (ship.orientation === "h") {
          newShip.push(randomCoordinates + i)
        } else if (ship.orientation === "v") {
          newShip.push(randomCoordinates + (i*10))
        };
      };

      // check if valid (within grid, does not wrap around grid)
      const withinGrid = newShip.every(square => square < 100);
      const modArr = newShip.map(square => square % 10);
      const sortArr = newShip.map(square => square % 10).sort();
      const noWrap = (JSON.stringify(modArr) === JSON.stringify(sortArr));
      coordsNotValid = !(withinGrid && noWrap);

       // check coordinates do not overlap with other ships
       isNotClear = !newShip.map(coord => grid[coord] === null).every(square => square); 
    };

    // mark ships on internal grid
    newShip.forEach(square => grid[square] = "x");

    randomFleetPosition.push(newShip);
  });

  return randomFleetPosition;
};

export default randomShipArray;