
// Styling
import styled from "styled-components";

// Utils
import { getAssetLink } from 'utils';

const PieceGroup = styled.div`
  display: inline-block;
  max-height: 100%;
`;

const Container = styled.div`
  /* grid-column: 2 / span 4;
  grid-row: 2 / span 1; */
  justify-self: start;
`;

// Styling to allow for the pieces to overlap each other
const CapturedPieceImg = styled.img`
  height: 100%;
  
`;

const TempDiv = styled.div`
  display: inline-block;
  z-index: ${p => p.z};
  position: relative;
  max-height: 100%;
  height: auto;
  width: auto;

  & + & {
    margin-left: -35px;
  };
`;

const Temp = ({ asset, z }) => {
  return (
    <TempDiv z={z}>
      <CapturedPieceImg src={asset}/>
    </TempDiv>
  )
};

const CapturesDisplay = ({ captures, side }) => {
  const capturedPieces = Object.keys(captures).map(pieceType => {
    let _amountCaptured = captures[pieceType];
    const pieceImgs = [];

    try {
      if (_amountCaptured > 0) {
        const asset = getAssetLink(side, pieceType);
  
        while (_amountCaptured > 0) {
          pieceImgs.push(
            <Temp key={_amountCaptured} asset={asset} z={_amountCaptured}/>
          );
          _amountCaptured -= 1;
        };
      };
    } finally {
      return pieceImgs;
    }
  });

  return(
    <Container>
      {capturedPieces.flatMap((val) => (
        val.length !== 0 ? 
        <PieceGroup>
          {val}
        </PieceGroup>
        : null
      ))}
    </Container>
  );
};

export default CapturesDisplay;
