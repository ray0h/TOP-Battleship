import render from "./render";

const gameplay = (player1, player2, p1Board, p2Board) => {

  let coordinates;
  let renderBoard = render();
  let compHits = {
    checkOtherEnd: false,
    chasingSequence: false,
    hitSniffing: false,
    origHit: -1,
    offset: 0,
    hits: [],
  };

  player1.setTurn(true);
  player2.setTurn(false);

  const isThereWinner = () => {
    if (p1Board.allShipsSunk()) {
      renderBoard.message("player2 won the game!");
      return "player2";
    } else if (p2Board.allShipsSunk()) {
      renderBoard.message("player1 won the game!");
      return "player1";
    } else {
      return false;
    };
  };

  const wait = (ms) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(ms)
      }, ms)
    });
  };

  const isValidCoordinates = (coordinate, lastHit = compHits.hits[compHits.hits.length - 1].coord) => {
    const isInGrid = (coordinate < 100 && coordinate >= 0);

    let square = (p1Board.boardArray[coordinate])
    const isEmpty = (square !== "hit" && square !== "miss");
    const notWrapGridLeft = !(lastHit % 10 === 0 && coordinates === lastHit - 1);
    const notWrapGridRight = !(lastHit % 10 === 9 && coordinates === lastHit + 1);

    return (isInGrid && isEmpty && notWrapGridRight && notWrapGridLeft);
  }; 

  const createHitObject = (coordinates) => {
    let initialNeighbors = [
      coordinates - 10, 
      coordinates + 1, 
      coordinates + 10, 
      coordinates - 1
    ];

    const checkNeighbors = () => {
      return initialNeighbors
        .map((coordinate) => 
          isValidCoordinates(coordinate, coordinates) ? coordinate : "")
        .filter(coordinate => coordinate !== "");
    };

    return {
      coord: coordinates,
      neighbors: checkNeighbors(),
    };
  };

  async function playRound(event) {
    // if winner, gameplay disabled
    // human player 1 click starts round
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
        isThereWinner();
        return;
      };

      player1.setTurn(false);
      player2.setTurn(true);

      // computer player 2 gameplay
      // four states:
      // 1. looking for hit (random move)
      // 2. sniffing around neighboring cells to link sequence of hits
      // 3. moving down the line sequence of hits
      // 4. if hit end of grid/miss, check the other end of the sequence start

      const checkOtherEnd = () => {
        coordinates = compHits.origHit - compHits.offset;
        if (isValidCoordinates(coordinates)) {
          player2.attack(p1Board, coordinates);
          if (p1Board.boardArray[coordinates] === "hit") {
            compHits.hits.push(createHitObject(coordinates));
            compHits.checkOtherEnd = false;
            compHits.chasingSequence = true;
            compHits.offset = -compHits.offset;
          } else { // miss
            compHits.checkOtherEnd = false;
            compHits.offset = 0;
          };
        } else { // not valid coordinates
          compHits.checkOtherEnd = false;
          useRandomCoordinates();
        };
      };

      const chasingSequence = () => {
        coordinates = compHits.hits[compHits.hits.length - 1].coord + compHits.offset;
        if (isValidCoordinates(coordinates)) {
          player2.attack(p1Board, coordinates);
          if (p1Board.boardArray[coordinates] === "hit") {
            compHits.hits.push(createHitObject(coordinates));
          } else { // miss
            compHits.chasingSequence = false;
            compHits.checkOtherEnd = true;
          };
        } else { // invalid coordinates - check other end
          coordinates = compHits.origHit - compHits.offset;
          if (isValidCoordinates(coordinates)) {
            player2.attack(p1Board, coordinates);
            if (p1Board.boardArray[coordinates] === "hit") {
              compHits.hits.push(createHitObject(coordinates));
              compHits.offset = - compHits.offset;
            } else { // miss
              compHits.chasingSequence = false;
              compHits.checkOtherEnd = false;
            };
          } else { // both ends checked/invalid so go random
            compHits.chasingSequence = false;
            useRandomCoordinates();
          };
        };
      };

      let randomNeighbor, neighborLength;
      const hitSniffing = () => {
        neighborLength = compHits.hits[compHits.hits.length - 1].neighbors.length;
        randomNeighbor = Math.floor(Math.random()*neighborLength);
        coordinates = compHits.hits[compHits.hits.length - 1].neighbors[randomNeighbor];
        player2.attack(p1Board, coordinates);
        if (p1Board.boardArray[coordinates] === "hit") {
          compHits.hits.push(createHitObject(coordinates));
          compHits.chasingSequence = true;
          compHits.hitSniffing = false;
          compHits.offset = compHits.hits[compHits.hits.length - 1].coord - compHits.hits[compHits.hits.length - 2].coord;
         } else { // miss
          compHits.hits[compHits.hits.length - 1].neighbors = compHits.hits[compHits.hits.length - 1].neighbors.filter(neighbor => neighbor !== coordinates);
        };
      };

      const useRandomCoordinates = () => {
        coordinates = Math.floor(Math.random() * 100);
        while (!isValidCoordinates(coordinates, -1)) {
          coordinates = Math.floor(Math.random() * 100);
        };
        
        player2.attack(p1Board, coordinates);
        if (p1Board.boardArray[coordinates] === "hit") {
          compHits.hits.push(createHitObject(coordinates));
          compHits.hitSniffing = true;
          compHits.origHit = coordinates;
        };
      };

      if (compHits.checkOtherEnd) {
        checkOtherEnd();
      } else if (compHits.chasingSequence) {
        chasingSequence();
      } else if (compHits.hitSniffing) {
        hitSniffing();
      } else { 
        useRandomCoordinates();
      };

      await(wait(500));
      renderBoard.update(p1Board);  
      isThereWinner();

      // skip p1's turn if getting hits
      while (p1Board.boardArray[coordinates] === "hit") {

        if (compHits.checkOtherEnd) {
          checkOtherEnd();
        } else if (compHits.chasingSequence) {
          chasingSequence();
        } else if (compHits.hitSniffing) {
          hitSniffing();
        } else { 
          useRandomCoordinates();
        };

        await(wait(500));
        renderBoard.update(p1Board); 
        isThereWinner();
      };

      player1.setTurn(true);
      player2.setTurn(false);
    };
  };

  // set up board to kick off gameplay
  const board = document.getElementById("p2Board");
  board.onclick=playRound;
};

export default gameplay;