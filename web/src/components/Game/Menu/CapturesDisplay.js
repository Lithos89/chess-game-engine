
// Styling
import styled from "styled-components";
import { devices } from "config/devices";

// Utils
import { getAssetLink } from 'utils';

const PieceGroup = styled.div`
  display: inline-block;
  max-height: 100%;
`;

const Container = styled.div`
  justify-self: start;
  height: 2rem;

  @media ${devices.laptop} {
    height: 4rem;
  };
`;

// Styling to allow for the pieces to overlap each other
const ImgWrapper = styled.div`
  display: inline-block;
  z-index: ${p => p.z};
  position: relative;
  max-height: 100%;

  & + & {
    margin-left: -1.5rem;

    @media ${devices.laptop} {
      margin-left: -2rem;
    }
  };
`;

const CapturedPieceImg = styled.img`
  height: 2rem;

  @media ${devices.laptop} {
    height: 3rem;
  };
`;

const CapturesDisplay = ({ captures, side }) => {
  const capturedPieces = Object.keys(captures ?? {}).map(pieceType => {
    let _amountCaptured = captures[pieceType];
    const pieceImgs = [];

    try {
      if (_amountCaptured > 0) {
        const asset = getAssetLink(side, pieceType);
  
        while (_amountCaptured > 0) {
          pieceImgs.push(
            <ImgWrapper key={`${side}_${pieceType}_${_amountCaptured}`} z={_amountCaptured}>
              <CapturedPieceImg src={asset}/>
            </ImgWrapper>
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
      {capturedPieces.flatMap((val, i) => (
        <PieceGroup key={i}>
          {val}
        </PieceGroup>
      ))}
    </Container>
  );
};

export default CapturesDisplay;
