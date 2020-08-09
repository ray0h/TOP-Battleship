const Ship = (id, position) => {
  
  let hits = [];

  function hit(pos) {
    if (position.includes(pos)) {
      hits.push(pos);
    };
  };

  function isSunk() {
    return (hits.length === position.length) ? true : false;
  };

  return {
    id,
    length: position.length,
    hits,
    hit,
    isSunk,
  };
};

export default Ship;
