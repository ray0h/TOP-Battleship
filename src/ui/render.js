import dragHandlers from "./dragHandlers";

const render = () => {

  const initializeBoards = () => {
    const playerOneBoard = document.getElementById("p1Board");
    const playerTwoBoard = document.getElementById("p2Board");

    playerOneBoard.innerHTML = "";
    playerTwoBoard.innerHTML = "";
    
    for (let i = 0; i < 100; i++) {
      let newDiv1 = document.createElement("div");
      let newDiv2 = document.createElement("div");
      newDiv1.id = "p1Board-"+i; 
      newDiv1.classList.add("square");
      newDiv1.ondrop=dragHandlers().handleDrop;
      newDiv1.ondragover=dragHandlers().handleDragOver;
      newDiv1.ondragenter=dragHandlers().handleDragEnter;
      newDiv1.ondragleave=dragHandlers().handleDragLeave;
      newDiv1.ondragend=dragHandlers().handleDragEnd;
      newDiv2.id = "p2Board-"+i;
      newDiv2.classList.add("empty", "square");
      playerOneBoard.appendChild(newDiv1);
      playerTwoBoard.appendChild(newDiv2);
    };
  };

  const update = (board) => {
    board.boardArray.forEach(function(sq, index) {
      let square = document.getElementById(`${board.boardId}-${index}`);
  
      if (sq === "miss") {
        square.classList.add("miss");
        square.textContent = '\u2022';
      } else if (sq === "hit") {
        square.classList.add("hit");
        square.textContent = '\u002B';
      }
    });
  
  };

  const makeDraggableShips = (shipArray) => {

    shipArray.forEach( (ship, index) => {
      const orientation = (ship[1] - ship[0] === 1) ? "h" : "v";
      const newShip = document.createElement("div");
      for (let i = 0; i < ship.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("square");
        newDiv.id = `p1Board-${ship[i]}sh`;
        newDiv.onmouseenter = dragHandlers().handleMouseEnter;
        newShip.appendChild(newDiv);
      };

      newShip.classList.add("dragMe");
      newShip.id = `ship${index}-${ship.length}${orientation}${ship[0]}`;
      newShip.setAttribute("draggable", "true");

      newShip.style.display = "grid";
      newShip.style.gridGap = "1px";

      if (orientation === "h") {
        newShip.style.height = "27px";
        newShip.style.width = `${ship.length * 26}px`; 
        newShip.style.gridTemplateColumns = `repeat(${ship.length}, 25px)`;
      } else if(orientation === "v") {
        newShip.style.height = `${ship.length * 26}px`;
        newShip.style.width = "27px";
        newShip.style.gridTemplateRows = `repeat(${ship.length}, 25px)`;
      };
      newShip.ondragstart=dragHandlers().handleDragStart;
      newShip.ondblclick=rotateShip;

      let position = document.getElementById(`p1Board-${ship[0]}`);
      position.appendChild(newShip);
      
    });
  };

  const clearDraggableShips = () => {
    const draggableShips = document.querySelectorAll(".dragMe");

    draggableShips.forEach(ship => {
      let parentDiv = ship.parentNode;
      parentDiv.innerHTML = "";
    });
  };

  const isLegalRotation = (coords) => {
    const withinGrid = coords.every(el => el < 100);
    const modArr = coords.map(el => el % 10);
    const sortArr = coords.map(el => el % 10).sort();
    const noWrap = (JSON.stringify(modArr) === JSON.stringify(sortArr));
    const newCoordsValid = withinGrid && noWrap;

    const noOverlap = coords
      .map((id, ind) => ind !== 0 ? `p1Board-${id}sh` : "")
      .map(sq => (document.getElementById(sq) === null))
      .every(el => el);
    
    return (newCoordsValid && noOverlap);
  }; 

  const rotateShip = (e) => {
    let id = e.target.parentNode.id;
    // let id = e.target.id;
    let ship = document.getElementById(id);
    let length = id.slice(6,7);
    let orient = id.slice(7,8);
    let loc = Number(id.match(/^((?!offset\d+).)+/g)[0].slice(8));
    let squares = [...ship.childNodes];
    let possSqs; 

    let params = {
      height : (orient === "h") ? `${length * 26}px` : "27px",
      width : (orient === "h") ? "27px" : `${length * 26}px`,
      gridRows : (orient === "h") ? `repeat(${length}, 25px)` : "",
      gridCols : (orient === "h") ? "" : `repeat(${length}, 25px)`,
      newOrient : (orient === "h") ? "v" : "h",
      factor : (orient === "h") ? 10 : 1
    };
    
    possSqs = squares.map((sq, index) => loc+index*params.factor);
    if (isLegalRotation(possSqs)) {
      ship.style.height = params.height;
      ship.style.width = params.width;
      ship.style.gridTemplateRows = params.gridRows;
      ship.style.gridTemplateColumns = params.gridCols;
      ship.id = ship.id.slice(0,7) + params.newOrient + ship.id.slice(8);
      squares.forEach((sq, index) => {
        sq.id = `p1Board-${loc+index*params.factor}sh`;
      });
    };
  };


  const message = (msg) => {
    const message = document.getElementById("message");
    message.textContent = msg;
  };

  return {
    initializeBoards,
    update,
    makeDraggableShips,
    clearDraggableShips,
    rotateShip,
    message,
  }
};

export default render;