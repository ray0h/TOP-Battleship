const dragHandlers = () => {
  // draggable ships comprised of unit squares
  // ship square ids based on board square location they are covering

  const handleMouseEnter = (e) => {
    const square = document.getElementById(e.target.id);
    const parent = square.parentNode;

    // get mouse location, main ship marker location
    const currentMousePosition = Number(e.target.id.match(/^((?!sh).)+/g)[0].slice(8));
    const shipBow = Number(parent.id.match(/^((?!offset\d+).)+/)[0].slice(8));
    const offset = currentMousePosition - shipBow;

    if (parent.id.includes("offset")) {
      parent.id = parent.id.match(/^((?!offset\d+).)+/)[0]+`offset${offset}`;
    } else {
      parent.id = parent.id + `offset${offset}`;
    };
  };

  const handleDragStart = (e) => {
    e.target.style.opacity = "0.4";
    e.dataTransfer.setData("shipId", e.target.id.match(/^((?!offset\d+).)+/)[0]);
    e.dataTransfer.setData("length", Number(e.target.id.slice(6,7) ));
    e.dataTransfer.setData("orientation", e.target.id.slice(7,8) );
    e.dataTransfer.setData("location", Number(e.target.id.slice(8) ));
    e.dataTransfer.setData("offset", Number(e.target.id.match(/offset\d+/g)[0].slice(6)));
    e.target.id = e.target.id.match(/^((?!offset\d+).)+/)[0];
  };

  const handleDragOver = (e) => {
    if (e.preventDefault()) {
      e.preventDefault();
    };
    return false;
  };

  function handleDragEnter (e) {
  };

  function handleDragLeave (e) {
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("shipId");
    let dragged = document.getElementById(draggedId);
    
    // check dragged ship doesnt overlap with another ship (except itself)
    const orientation = e.dataTransfer.getData("orientation");
    const offset = e.dataTransfer.getData("offset");

    let current = e.target.id.match(/^((?!sh).)+/g)[0]
    let spot = Number(current.slice(8));
    let offsetValue = current.slice(0,8)+(spot-Number(offset))

    // const dropArea = document.getElementById(e.target.id.match(/^((?!sh).)+/g));
    const dropArea = document.getElementById(offsetValue);
    const squares = [...dragged.childNodes];
    const currSqs = squares.map(sq => sq.id);
    const possSqs = squares.map((sq, index) => 
    (orientation === "h") 
    ? `p1Board-${Number(dropArea.id.slice(8)) + index}sh`
    : `p1Board-${Number(dropArea.id.slice(8)) + index*10}sh`
    );
    const noOverlap = possSqs
      .map(sq => (document.getElementById(sq) === null) || currSqs.includes(sq))
      .every(el => el);

    // check if dragged ship remains on the grid
    const squareIds = possSqs.map(sq => Number(sq.match(/^((?!sh).)+/g)[0].slice(8)));
    const withinGrid = squareIds.every(el => (el < 100 && el >= 0));
    const modArr = squareIds.map(el => el % 10);
    const sortArr = squareIds.map(el => el % 10).sort();
    const noWrap = (JSON.stringify(modArr) === JSON.stringify(sortArr));
    const newCoordsValid = withinGrid && noWrap;
    
    // do not append if dropping on current square or does not meet above conditions
    let location = e.dataTransfer.getData("location");
    if ((e.target.id !== `p1Board-${location}`) && newCoordsValid && noOverlap) {
      dropArea.appendChild(dragged);

      // rename ship id/square id's based on new location
      dragged.id = dragged.id.slice(0,8)+Number(dropArea.id.slice(8));
      squares.forEach((sq, index) => sq.id = possSqs[index]);
    };
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  return {
    handleMouseEnter,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
};

export default dragHandlers;