import render from "../ui/render";
import Gameboard from "../factories/gameboard";

describe ("render ui - initializeBoards", () => {
  test("module has a initializeBoards function", () => {
    expect(Object.keys(render())).toContain("initializeBoards");
    expect(typeof(render().initializeBoards)).toBe("function");
  });

  beforeEach( () => {
    document.body.innerHTML =
    "<div>" +
    " <div id='p1Board'></div>" + 
    " <div id='p2Board'></div>" +
    "</div>";
  });
  
  test("initializeBoards method creates 100 div grid for html p1Board, p2Board", () => {
    let p1Board = document.getElementById("p1Board");
    let p2Board = document.getElementById("p2Board");
    expect(p1Board.hasChildNodes()).toBeFalsy();
    expect(p2Board.hasChildNodes()).toBeFalsy();

    render().initializeBoards();

    expect(p1Board.hasChildNodes()).toBeTruthy();
    expect(p1Board.childNodes.length).toBe(100);
    expect(p2Board.hasChildNodes()).toBeTruthy();
    expect(p2Board.childNodes.length).toBe(100);
  });

  test("all grid squares have a class called 'square' ", () => {
    render().initializeBoards();
    const boards = document.getElementsByClassName("square");
    expect(boards.length).toBe(200);
  });

  test("only p2squares have a class called 'empty' ", () => {
    render().initializeBoards();
    const empties = document.getElementsByClassName("empty");
    expect(empties.length).toBe(100);
    let empArr = [...empties];
    expect(empArr[0].parentNode.id).toBe("p2Board");
  });

}); 

describe("render ui, update", () => {

  test("a miss/hit on the board square adds a 'miss'/'hit' class", () => {
    let mockBoard1 = Gameboard("p1Board");
    mockBoard1.placeShip([3,4]);
    mockBoard1.receiveAttack(7);
    mockBoard1.receiveAttack(3);
    render().update(mockBoard1);
    let missSquare = document.getElementById("p1Board-7");
    expect(missSquare.classList).toContain("miss");
    let hitSquare = document.getElementById("p1Board-3");
    expect(hitSquare.classList).toContain("hit");
  });

});

describe("render ui, makeDraggableShips", () => {

  test("method creates same number of 'ships' as called by shipArray", () => {

    render().initializeBoards();
    let shipArray = [
      [67, 68],
      [41, 42, 43]
    ];
    render().makeDraggableShips(shipArray);
    let ships = document.getElementsByClassName("dragMe");
    expect(ships.length).toEqual(shipArray.length);
  });

  test("created ships are draggable", () => {
    render().initializeBoards();
    let shipArray = [
      [67, 68],
      [41, 42, 43]
    ];
    render().makeDraggableShips(shipArray);
    const ships = document.getElementsByClassName("dragMe");
    const ship = [...ships];

    expect(ship[0].getAttribute("draggable")).toBe("true");
    expect(ship[1].getAttribute("draggable")).toBe("true");
  });

  test("horizontal ships are rendered with width / height ~ ship length", () => {
    render().initializeBoards();
    let shipArray = [
      [41, 42, 43]
    ];
    render().makeDraggableShips(shipArray);
    const ships = document.getElementsByClassName("dragMe");
    const ship = [...ships][0];
    let width = Number(ship.style.width.match(/[^px]+/)) + ship.childNodes.length;
    let height = Number(ship.style.height.match(/[^px]+/));
    
    expect(width/height).toEqual(ship.childNodes.length);
  });

  test("vertical ships are rendered with height / width = ship length", () => {
    render().initializeBoards();
    let shipArray = [
      [41, 51, 61, 71]
    ];
    render().makeDraggableShips(shipArray);
    const ships = document.getElementsByClassName("dragMe");
    const ship = [...ships][0];
    let width = Number(ship.style.width.match(/[^px]+/));
    let height = Number(ship.style.height.match(/[^px]+/)) + ship.childNodes.length;
    
    expect(height/width).toEqual(ship.childNodes.length);
  });

});

describe("render ui, clearDraggableShips", () => {
  test("when method called, no 'dragMe' class elements found", () => {
    render().initializeBoards();
    let shipArray = [
      [67, 68],
      [41, 42, 43],
      [1, 11],
    ];
    render().makeDraggableShips(shipArray); 
    render().clearDraggableShips();
    const ships = document.getElementsByClassName("dragMe");
    expect(ships.length).toBe(0);
  });
});

describe("render ui, rotateShip", () => {
  test("horizontal ship turns vertical", () => {
    render().initializeBoards();
    let shipArray = [
      [57, 58, 59],
    ];
    render().makeDraggableShips(shipArray);
    let ship = document.getElementById("p1Board-57sh");

    const event = new MouseEvent('dblclick', 
    {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    
    // ship.addEventListener('dblclick', render().rotateShip, true);
    ship.dispatchEvent(event);

    let squares = [...ship.parentNode.childNodes];
    let coords = squares.map(square => 
      Number(square.id.match(/^((?!sh).)+/)[0].slice(8))
    );
    expect(coords[0]).toBe(57);
    expect(coords[1]).toBe(67);
    expect(coords[2]).toBe(77);
  });

  test("vertical ship turns horizontal", () => {
    render().initializeBoards();
    let shipArray = [
      [37, 47, 57],
    ];
    render().makeDraggableShips(shipArray);
    let ship = document.getElementById("p1Board-47sh");

    const event = new MouseEvent('dblclick', 
    {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    
    // ship.addEventListener('dblclick', render().rotateShip, true);
    ship.dispatchEvent(event);

    let squares = [...ship.parentNode.childNodes];
    let coords = squares.map(square => 
      Number(square.id.match(/^((?!sh).)+/)[0].slice(8))
    );
    expect(coords[0]).toBe(37);
    expect(coords[1]).toBe(38);
    expect(coords[2]).toBe(39);
  });

  test("rotation that overlaps with another ship does not execute", () => {
    render().initializeBoards();
    let shipArray = [
      [37, 38, 39, 40],
      [47, 48, 49]
    ];
    render().makeDraggableShips(shipArray);
    let ship = document.getElementById("p1Board-37sh");

    const event = new MouseEvent('dblclick', 
    {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    
    ship.addEventListener('dblclick', render().rotateShip, true);
    ship.dispatchEvent(event);

    let squares = [...ship.parentNode.childNodes];
    let coords = squares.map(square => 
      Number(square.id.match(/^((?!sh).)+/)[0].slice(8))
    );
    expect(coords[0]).toBe(37);
    expect(coords[1]).toBe(38);
    expect(coords[2]).toBe(39);
    expect(coords[3]).toBe(40);
  });

  test("rotation that goes off grid does not execute", () => {
    render().initializeBoards();
    let shipArray = [
      [94, 95, 96, 97],
    ];
    render().makeDraggableShips(shipArray);
    let ship = document.getElementById("p1Board-94sh");

    const event = new MouseEvent('dblclick', 
    {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    
    ship.addEventListener('dblclick', render().rotateShip, true);
    ship.dispatchEvent(event);

    let squares = [...ship.parentNode.childNodes];
    let coords = squares.map(square => 
      Number(square.id.match(/^((?!sh).)+/)[0].slice(8))
    );
    expect(coords[0]).toBe(94);
    expect(coords[1]).toBe(95);
    expect(coords[2]).toBe(96);
    expect(coords[3]).toBe(97);
  });
});

describe("render ui message", () => {
  test("message is rendered inside div when method is called", () => {
    document.body.innerHTML = " <div id='message'></div>";
    render().message("Hello world!");
    const msg = document.getElementById("message");
    expect(msg.textContent).toBe("Hello world!");
  }); 
});