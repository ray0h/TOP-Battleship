import Ship from "../components/ships";

describe("testing Ship function factory", () => {

  test ("returns a ship object", () => {
    expect(typeof(Ship([]))).toBe("object");
  });

  test ("contains keys: length, hit array, isSunk", () => {
    expect(Object.keys(Ship([]) )).toContain("length");
    expect(Object.keys(Ship([]) )).toContain("hits");
    expect(Object.keys(Ship([]) )).toContain("isSunk");
  });

  test("hit function should update hits array", () => {
    const mockShip = Ship( [1,2,3] );
    mockShip.hit(2); // is a hit
    mockShip.hit(4); // not a hit

    expect(mockShip.hits.length).toEqual(1);
  });

  test("isSunk initially false and returns true when all positions of ship are hit", () => {
    const mockShip = Ship( [1,2,3] );
    expect(mockShip.isSunk()).toBe(false);
    
    mockShip.hit(1);
    mockShip.hit(2);
    mockShip.hit(3);
    expect(mockShip.isSunk()).toBe(true);
  });

});