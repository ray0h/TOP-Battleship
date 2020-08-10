import randomShipArray from "../factories/randomShipArray";

describe("randomShipArray function - testing features of shipArray; can't really test randomness?...", () => {

  test("makes an array of ships per game convention (no = 5, length = 2-5, vert/horiz orientation)", () => {
    const fleet = randomShipArray();
    fleet.forEach(ship => {
      let delta;
      ship.forEach((square, index) =>
        delta = (index !== 0) ? ship[index] - ship[index-1] : "");
      expect([1, 10, ""]).toContain(delta); 
    });

    expect(fleet.length).toBe(5);
    
    const lengths = fleet.map(ship => ship.length);
    expect(lengths).toContain(5);
    expect(lengths).toContain(4);
    expect(lengths).toContain(3);
    expect(lengths).toContain(2);
  });
  
  test("ships can not be placed outside of 10x10 grid or overlap with one another (each square location unique)", () => {
    const fleet = randomShipArray();
    const coordinates = fleet.reduce((flat, ship) => flat.concat(ship));
    
    coordinates.forEach(square =>
      expect(square < 100).toBe(true)
    );
      
    expect(coordinates.length).toEqual(17);
    expect(coordinates.length === new Set(coordinates).size).toBe(true);
  });
});