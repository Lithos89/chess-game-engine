import { useState } from 'react';


// ?: Worth considering in the future if I want to keep this
// ?: name for the hook because it doesn't really reflect the
// ?: function of the hook.

// TODO: Change props to a destructured object with the values I want to pass in
const useBoardLayout = ( matchController ) => {

  const [boardSquares, setBoardSquares] = useState(matchController.start());

  const resetSquares = () => {
    setBoardSquares(matchController.reset()); 
  };

  return [boardSquares, resetSquares];
};

export default useBoardLayout;
