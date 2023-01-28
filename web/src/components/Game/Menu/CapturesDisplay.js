
// Utils
import { getAssetLink } from 'utils';

const CapturesDisplay = ({ captures }) => {
  const [capturedBlackPieces, capturedWhitePieces] = Object.keys(captures).map((side) => 
    Object.keys(captures[side]).map(pieceType => {
      let _amountCaptured = captures[side][pieceType];
      const pieceImgs = [];

      try {
        if (_amountCaptured > 0) {
          const asset = getAssetLink(side, pieceType);
    
          while (_amountCaptured > 0) {
            pieceImgs.push(<img src={asset} key={_amountCaptured} />);
            _amountCaptured -= 1;
          };
        };
      } finally {
        return pieceImgs;
      }
    })
  );

  return(
    <div>
      <h3>Captures</h3>
      <div>
        {capturedBlackPieces.flatMap((val) => (
          <div style={{ display: 'inline-block'}}>
            {val}
          </div>
        ))}
      </div>
      <div>
        {capturedWhitePieces.flatMap((val) => (
          <div style={{ display: 'inline-block'}}>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapturesDisplay;
