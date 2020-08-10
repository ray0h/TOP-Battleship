import Gameboard from "../factories/gameboard";
import Ship from "../factories/ships";

describe("testing Gameboard function factory", () => {
  test("returns a gameboard object", () => {
    expect(typeof(Gameboard("board1") )).toBe("object");
  });

  test("has a board id key", () => {
    const mockGameboard = Gameboard("board1");
    expect(Object.keys(mockGameboard)).toContain("boardId");
    expect(mockGameboard.boardId).toBe("board1");
  });

  describe("Gameboard can place ships onto board", () => {
    test("can place a ship by using Ship factory and a set of coordinates", () => {
      let mockGameboard = Gameboard("board1");
      mockGameboard.placeShip([1,2]);
      expect(mockGameboard.boardArray[1]).toBe(1);
      expect(mockGameboard.boardArray[2]).toBe(1);
    });
    
    test("ships will not overlap on top of one another", () => {
      let mockGameboard = Gameboard("board1");
      mockGameboard.placeShip([1,2]);
      mockGameboard.placeShip([1,2,3,4]);
      expect(mockGameboard.boardArray[1]).toBe(1);
      expect(mockGameboard.boardArray[2]).toBe(1);
      expect(mockGameboard.boardArray[3]).toBe(undefined);
      expect(mockGameboard.boardArray[4]).toBe(undefined);
    });

    test("ships can be placed vertically", () => {
      let mockGameboard = Gameboard("board1");
      mockGameboard.placeShip([31, 41, 51, 61]);
      expect(mockGameboard.boardArray[31]).toBe(1);
      expect(mockGameboard.boardArray[41]).toBe(1);
      expect(mockGameboard.boardArray[51]).toBe(1);
      expect(mockGameboard.boardArray[61]).toBe(1);
    });

  });

  describe("Gameboard has a method receiveAttack that records hits/misses to board", () => {
    test("has a method - receiveAttack", () => {
      expect(Object.keys(Gameboard("board1"))).toContain("receiveAttack");
    });
    
    test("receiveAttack method miss records it on gameboard", () => {
      let mockGameboard = Gameboard("board1"); 
      mockGameboard.placeShip([1,2,3]);
      mockGameboard.receiveAttack(4);

      expect(mockGameboard.boardArray[4]).toBe("miss");
    });
    
    test("receiveAttack method hit records hit and sends hit coordinate to relevant ship object", () => {
      let mockGameboard = Gameboard("board1"); 
      mockGameboard.placeShip([1,2,3]);
      mockGameboard.placeShip([11,12])
      mockGameboard.receiveAttack(1);
      mockGameboard.receiveAttack(12);

      expect(mockGameboard.boardArray[1]).toBe("hit");
      expect(mockGameboard.boardArray[12]).toBe("hit");
      expect(mockGameboard.shipArray[0].hits.length).toBe(1);
      expect(mockGameboard.shipArray[1].hits.length).toBe(1);
    });
  });

  describe("Gameboard tracks ships", () => {

    test("Gameboard tracks multiple ships and is aware when a ship is sunk", () => {
      let mockGameboard = Gameboard("board1");
      mockGameboard.placeShip([1,2,3]);
      mockGameboard.placeShip([11,21,31]);
      mockGameboard.placeShip([5,6,7,8]);
      expect(mockGameboard.shipArray.length).toBe(3);
      
      mockGameboard.receiveAttack(5);
      mockGameboard.receiveAttack(6);
      mockGameboard.receiveAttack(7);
      mockGameboard.receiveAttack(8);
      expect(mockGameboard.shipArray[2].isSunk()).toBe(true);
    });

    test("Gameboard tracks multiple ships and recognizes when all ships are sunk", () => {
      let mockGameboard = Gameboard("board1");
      mockGameboard.placeShip([1,2]);
      mockGameboard.placeShip([5,6]);
      mockGameboard.placeShip([11,12]);
      expect(mockGameboard.shipArray.length).toBe(3);
      expect(mockGameboard.allShipsSunk()).toBe(false);

      mockGameboard.receiveAttack(1);
      mockGameboard.receiveAttack(2);
      expect(mockGameboard.allShipsSunk()).toBe(false);

      mockGameboard.receiveAttack(5);
      mockGameboard.receiveAttack(6);
      expect(mockGameboard.allShipsSunk()).toBe(false);

      mockGameboard.receiveAttack(11);
      mockGameboard.receiveAttack(12);
      expect(mockGameboard.allShipsSunk()).toBe(true);
    });
  });
});