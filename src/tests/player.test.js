import Player from "../components/player";
import Gameboard from "../components/gameboard";

describe("Player", () => {
  test("Player exists", () => {
    let mockPlayer = Player();
    expect(mockPlayer).toBeTruthy();
    expect(typeof(mockPlayer)).toBe("object");
  });

  describe("Player Interaction", () => {
    let mockPlayer1, mockPlayer2, p1Board, p2Board;

    beforeEach(() => {
      mockPlayer1 = Player();
      mockPlayer2 = Player();
      p1Board = Gameboard();
      p2Board = Gameboard();
    });

    test("Player can attack each other's boards", () => {
      mockPlayer1.attack(p2Board, 2);
      mockPlayer2.attack(p1Board, 5);
      
      expect(p1Board.boardArray[5]).toBe("miss");
      expect(p2Board.boardArray[2]).toBe("miss");
    });
    
    test("Player's turns can be get/set", () => {
      mockPlayer1.setTurn(false);
      mockPlayer2.setTurn(false);

      expect(mockPlayer1.getTurn()).toBeFalsy();
      expect(mockPlayer2.getTurn()).toBeFalsy();

      mockPlayer1.setTurn(true);

      expect(mockPlayer1.getTurn()).toBeTruthy();
    });

    test("Player can't attack if not their turn", () => {
      mockPlayer1.setTurn(false);
      mockPlayer1.attack(p2Board, 2);

      expect(p2Board.boardArray[2]).toBeUndefined();
    });
  });

  describe("AI Player", () => {

    let mockAIPlayer, enemyBoard;
    beforeEach (() => {
      mockAIPlayer = Player();
      enemyBoard = Gameboard();
    });

    test("Player can use randomAttack method to pick random square", () => {
      mockAIPlayer.randomAttack(enemyBoard);
      expect(enemyBoard.boardArray.filter(sq => sq === "miss").length).toEqual(1);
    });

    test("randomAttack will not choose already filled square", () => {
      let filledBoard = Array(100).fill("hit");
      filledBoard[5] = undefined; // only empty space

      enemyBoard.boardArray.length = 0;
      enemyBoard.boardArray.push(...filledBoard);
      mockAIPlayer.randomAttack(enemyBoard);
      
      expect(enemyBoard.boardArray[5]).toBe("miss");
    });

    test.todo("make AI smarter (follow squares around a hit in sequence");
  });
});