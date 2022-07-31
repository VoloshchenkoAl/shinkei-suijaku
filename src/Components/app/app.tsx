import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useMachine } from '@xstate/react';

/* @Selectors */
import { isCardsExistsSelector } from 'machines/game/selector';

/* @Pages */
import { Start } from 'pages/start';
import { Game } from 'pages/game';

/* @Machine */
import { gameMachine } from 'machines/game';

function App() {
  const navigate = useNavigate();
  const [gameState, gameDispatch] = useMachine(gameMachine, {
    actions: {
      gameOver: () => navigate('/game-over'),
      gameWin: () => navigate('/win'),
    },
  });

  const onLoadCards = (cards: GameCard[]) => {
    gameDispatch({
      type: 'SET_CARDS',
      cards,
    });

    navigate('/game');
  };

  return (
    <Routes>
      <Route path="/game">
        {isCardsExistsSelector(gameState.context) ? (
          <Game state={gameState} dispatcher={gameDispatch} />
        ) : (
          <Navigate to="/" />
        )}
      </Route>
      <Route path="/game-over">
        <h1>Your Loose the game!</h1>
      </Route>
      <Route path="/win">
        <h1>Your Win!</h1>
      </Route>
      <Route path="/">
        <Start handleLoadCars={onLoadCards} />
      </Route>
    </Routes>
  );
}

export default App;
