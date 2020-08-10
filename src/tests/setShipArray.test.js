import setShipArray from "../ui/setShipArray";
import render from "../ui/render";
import Gameboard from "../factories/gameboard";

test("ships do not appear on p1 gameboard until after setShipArray method", () => {
  document.body.innerHTML = 
  "<div>" +
  " <div id='p1Board'></div>" +
  " <div id='p2Board'></div>" +
  "</div>"

  render().initializeBoards();
  const p1Board = Gameboard();
  const shipArray = [
    [5, 6, 7],
    [8, 18],
    [31, 32, 33, 34, 35],
    [58, 68, 78, 88],
    [93, 94, 95],
  ];

  render().makeDraggableShips(shipArray);

  shipArray.forEach((ship) => {
    ship.forEach((square) => {
      expect(p1Board.boardArray[square]).toBe(undefined);
    });
  });

  setShipArray(p1Board);
  render().clearDraggableShips();

  shipArray.forEach((ship, index) => {
    ship.forEach((square) => {
      expect(p1Board.boardArray[square]).toBe(index+1);
    });
  });

});