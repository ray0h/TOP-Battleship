import dragHandlers from "../ui/dragHandlers";
import render from "../ui/render";

describe("dragHandler functions - mouseEnter", () => {

  beforeEach( () => {
    document.body.innerHTML =
    "<div>" +
    " <div id='p1Board'></div>" + 
    " <div id='p2Board'></div>" +
    "</div>";
  });

  test("mouse entering valid ship square(s) will create offset with ship head", () => {
    render().initializeBoards();
    let shipArray = [
      [37, 47, 57],
    ];
    render().makeDraggableShips(shipArray);
    const section = document.querySelector("#p1Board-57sh");

    const event = new MouseEvent('mouseenter', 
    {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    
    section.addEventListener('mouseenter', dragHandlers().handleMouseEnter, true);
    section.dispatchEvent(event);

    let parentDiv = section.parentNode;
    let offset = parentDiv.id.match(/(offset\d+)/)[0];

    expect(offset).toBe("offset20");

    const newSection = document.querySelector("#p1Board-47sh");
    newSection.addEventListener('mouseenter', dragHandlers().handleMouseEnter, true);
    newSection.dispatchEvent(event);
    parentDiv = newSection.parentNode;
    offset = parentDiv.id.match(/(offset\d+)/)[0];

    expect(offset).toBe("offset10");
  });


});

describe("dragHandler functions - dragStart", () => {
  test.todo("drag start - unsure of how to test in jest")
});