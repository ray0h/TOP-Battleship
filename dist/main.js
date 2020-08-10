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
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/ships */ "./src/factories/ships.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");






/***/ })

/******/ });
//# sourceMappingURL=main.js.map