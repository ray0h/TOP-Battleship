import Gameboard from "../components/gameboard";
import Ship from "../components/ships";

describe("testing Gameboard function factory", () => {
  test("returns a gameboard object", () => {
    expect(typeof(Gameboard() )).toBe("object");
  });

  describe("Gameboard can place ships onto board", () => {
    test("can place a ship by using Ship factory and a set of coordinates", () => {
      let mockGameboard = Gameboard();
      mockGameboard.placeShip([1,2]);
      expect(mockGameboard.boardArray[1]).toBe(1);
      expect(mockGameboard.boardArray[2]).toBe(1);
    });
    
    test("ships can not overlap on top of one another", () => {
      let mockGameboard = Gameboard();
      mockGameboard.placeShip([1,2]);
      mockGameboard.placeShip([1,2,3,4]);
      expect(mockGameboard.boardArray[1]).toBe(1);
      expect(mockGameboard.boardArray[2]).toBe(1);
      expect(mockGameboard.boardArray[3]).toBe(undefined);
      expect(mockGameboard.boardArray[4]).toBe(undefined);
    });

    test.todo("ships can be placed horizontally or vertically");

    test.todo("the right number ofships are placed onto the board")
  });

  describe("Gameboard has a method receiveAttack that records hits/misses to board", () => {
    test("has a method - receiveAttack", () => {
      expect(Object.keys(Gameboard())).toContain("receiveAttack");
    });
    
    test("receiveAttack method miss records it on gameboard", () => {
      let mockGameboard = Gameboard(); 
      mockGameboard.placeShip([1,2,3]);
      mockGameboard.receiveAttack(4);

      expect(mockGameboard.boardArray[4]).toBe("miss");
    });
    
    test("receiveAttack method hit records hit and sends hit coordinate to relevant ship object", () => {
      let mockGameboard = Gameboard(); 
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
      let mockGameboard = Gameboard();
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
      let mockGameboard = Gameboard();
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