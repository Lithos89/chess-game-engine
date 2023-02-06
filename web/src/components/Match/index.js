
import { useEffect, useState } from 'react';
import Chess from 'chess-engine';

// Components
import Game from '../Game';

const Match = ({ matchId, mode }) => {
  // Make this into useReducer instead of useState
  const [match, setMatch] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [matchController, setMatchController] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);

  // Initial Match Load
  useEffect(() => {
    if (matchId) {
      Chess.setMatchObserver(setMatch, matchId);
    }
  }, [matchId]);

  useEffect(() => {
    if (match) {
      setMatchData(match.data);
      setMatchController(match.controller);
    };
  }, [match]);

  useEffect(() => {
    if (matchController && !gameStarted) {
      matchController.newGame();
      setGameStarted(true);
    }
  }, [matchController, gameStarted]);

  return (
    <Game
      gameId={matchData?.currentGame ?? null}
      matchInfo={matchData?.info}
      isSinglePlayer={mode !== "local"}
      primaryName={mode === "local" ? "Player 1" : "You"}
      opponentName={mode === "local" ? "Player 2" : "Computer"}
    />
  );
};

export default Match;
