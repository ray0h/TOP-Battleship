/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/factories/ships.js");


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
      let newShip = Object(_ships__WEBPACK_IMPORTED_MODULE_0__["default"])(id, coords);
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

/* harmony default export */ __webpack_exports__["default"] = (Gameboard);

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/factories/randomShipArray.js":
/*!******************************************!*\
  !*** ./src/factories/randomShipArray.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (randomShipArray);

/***/ }),

/***/ "./src/factories/ships.js":
/*!********************************!*\
  !*** ./src/factories/ships.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Ship = (id, position) => {
  
  let hits = [];

  function hit(pos) {
    if (position.includes(pos)) {
      hits.push(pos);
    };
  };

  function isSunk() {
    return (hits.length === position.length) ? true : false;
  };

  return {
    id,
    length: position.length,
    hits,
    hit,
    isSunk,
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Ship);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_randomShipArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/randomShipArray */ "./src/factories/randomShipArray.js");
/* harmony import */ var _ui_setShipArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/setShipArray */ "./src/ui/setShipArray.js");
/* harmony import */ var _ui_gameplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/gameplay */ "./src/ui/gameplay.js");
/* harmony import */ var _ui_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/render */ "./src/ui/render.js");







const renderBoard = Object(_ui_render__WEBPACK_IMPORTED_MODULE_5__["default"])();
// same button used to start / reset game
let btn = document.getElementById("gameBtn");

const setupGame = () => {

  const player1 = Object(_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const player2 = Object(_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  
  let p1Board = Object(_factories_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])("p1Board");
  const p2Board = Object(_factories_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])("p2Board");
  
  let p1Ships = Object(_factories_randomShipArray__WEBPACK_IMPORTED_MODULE_2__["default"])();
  let p2Ships = Object(_factories_randomShipArray__WEBPACK_IMPORTED_MODULE_2__["default"])();
  p2Ships.forEach(ship => p2Board.placeShip(ship));
  renderBoard.initializeBoards();
  renderBoard.makeDraggableShips(p1Ships);

  btn.onclick = () => {
    Object(_ui_setShipArray__WEBPACK_IMPORTED_MODULE_3__["default"])(p1Board);
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
  Object(_ui_gameplay__WEBPACK_IMPORTED_MODULE_4__["default"])(player1, player2, p1Board, p2Board);
};

setupGame();

/***/ }),

/***/ "./src/ui/dragHandlers.js":
/*!********************************!*\
  !*** ./src/ui/dragHandlers.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const dragHandlers = () => {
  // draggable ships comprised of unit squares
  // ship square ids based on board square location they are covering

  const handleMouseEnter = (e) => {
    const square = document.getElementById(e.target.id);
    const parent = square.parentNode;

    // get mouse location, main ship marker location
    const currentMousePosition = Number(e.target.id.match(/^((?!sh).)+/g)[0].slice(8));
    const shipBow = Number(parent.id.match(/^((?!offset\d+).)+/)[0].slice(8));
    const offset = currentMousePosition - shipBow;

    if (parent.id.includes("offset")) {
      parent.id = parent.id.match(/^((?!offset\d+).)+/)[0]+`offset${offset}`;
    } else {
      parent.id = parent.id + `offset${offset}`;
    };
  };

  const handleDragStart = (e) => {
    e.target.style.opacity = "0.4";
    e.dataTransfer.setData("shipId", e.target.id.match(/^((?!offset\d+).)+/)[0]);
    e.dataTransfer.setData("length", Number(e.target.id.slice(6,7) ));
    e.dataTransfer.setData("orientation", e.target.id.slice(7,8) );
    e.dataTransfer.setData("location", Number(e.target.id.slice(8) ));
    e.dataTransfer.setData("offset", Number(e.target.id.match(/offset\d+/g)[0].slice(6)));
    e.target.id = e.target.id.match(/^((?!offset\d+).)+/)[0];
  };

  const handleDragOver = (e) => {
    if (e.preventDefault()) {
      e.preventDefault();
    };
    return false;
  };

  function handleDragEnter (e) {
  };

  function handleDragLeave (e) {
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("shipId");
    let dragged = document.getElementById(draggedId);
    
    // check dragged ship doesnt overlap with another ship (except itself)
    const orientation = e.dataTransfer.getData("orientation");
    const offset = e.dataTransfer.getData("offset");

    let current = e.target.id.match(/^((?!sh).)+/g)[0]
    let spot = Number(current.slice(8));
    let offsetValue = current.slice(0,8)+(spot-Number(offset))

    // const dropArea = document.getElementById(e.target.id.match(/^((?!sh).)+/g));
    const dropArea = document.getElementById(offsetValue);
    const squares = [...dragged.childNodes];
    const currSqs = squares.map(sq => sq.id);
    const possSqs = squares.map((sq, index) => 
      (orientation === "h") 
        ? `p1Board-${Number(dropArea.id.slice(8)) + index}sh`
        : `p1Board-${Number(dropArea.id.slice(8)) + index*10}sh`
      );
    const noOverlap = possSqs
      .map(sq => (document.getElementById(sq) === null) || currSqs.includes(sq))
      .every(el => el);

    // check if dragged ship remains on the grid
    const squareIds = possSqs.map(sq => Number(sq.match(/^((?!sh).)+/g).slice(7)));
    const withinGrid = squareIds.every(el => el < 100);
    const modArr = squareIds.map(el => el % 10);
    const sortArr = squareIds.map(el => el % 10).sort();
    const noWrap = (JSON.stringify(modArr) === JSON.stringify(sortArr));
    const newCoordsValid = withinGrid && noWrap;
    
    // do not append if dropping on current square or does not meet above conditions
    let location = e.dataTransfer.getData("location");
    if ((e.target.id !== `p1Board-${location}`) && newCoordsValid && noOverlap) {
      dropArea.appendChild(dragged);

      // rename ship id/square id's based on new location
      dragged.id = dragged.id.slice(0,8)+Number(dropArea.id.slice(8));
      squares.forEach((sq, index) => sq.id = possSqs[index]);
    };
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  return {
    handleMouseEnter,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
};

/* harmony default export */ __webpack_exports__["default"] = (dragHandlers);

/***/ }),

/***/ "./src/ui/gameplay.js":
/*!****************************!*\
  !*** ./src/ui/gameplay.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/ui/render.js");


const gameplay = (player1, player2, p1Board, p2Board) => {

  let coordinates;
  let renderBoard = Object(_render__WEBPACK_IMPORTED_MODULE_0__["default"])();

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

/* harmony default export */ __webpack_exports__["default"] = (gameplay);

/***/ }),

/***/ "./src/ui/render.js":
/*!**************************!*\
  !*** ./src/ui/render.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dragHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragHandlers */ "./src/ui/dragHandlers.js");


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
      newDiv1.ondrop=Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDrop;
      newDiv1.ondragover=Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragOver;
      newDiv1.ondragenter=Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragEnter;
      newDiv1.ondragleave=Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragLeave;
      newDiv1.ondragend=Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragEnd;
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
        newDiv.onmouseenter = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleMouseEnter;
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
      newShip.ondragstart=Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragStart;
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

/* harmony default export */ __webpack_exports__["default"] = (render);

/***/ }),

/***/ "./src/ui/setShipArray.js":
/*!********************************!*\
  !*** ./src/ui/setShipArray.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (setShipArray);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map