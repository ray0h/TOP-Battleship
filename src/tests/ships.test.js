import Ship from "../factories/ships";

describe("testing Ship function factory", () => {

  test ("returns a ship object", () => {
    expect(typeof(Ship(0, []))).toBe("object");
  });

  test ("contains keys: length, hit array, isSunk", () => {
    expect(Object.keys(Ship(0, []) )).toContain("id");
    expect(Object.keys(Ship(0, []) )).toContain("length");
    expect(Object.keys(Ship(0, []) )).toContain("hits");
    expect(Object.keys(Ship(0, []) )).toContain("isSunk");
  });

  test("hit function should update hits array", () => {
    const mockShip = Ship( 0, [1,2,3] );
    mockShip.hit(2); // is a hit
    mockShip.hit(4); // not a hit

    expect(mockShip.hits.length).toEqual(1);
  });

  test("isSunk initially false and returns true when all positions of ship are hit", () => {
    const mockShip = Ship( 0, [1,2,3] );
    expect(mockShip.isSunk()).toBe(false);
    
    mockShip.hit(1);
    mockShip.hit(2);
    mockShip.hit(3);
    expect(mockShip.isSunk()).toBe(true);
  });

});