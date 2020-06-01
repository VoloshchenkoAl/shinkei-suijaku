import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useMachine } from '@xstate/react';

/* @Pages */
import { Start } from 'pages/Start';
import { Game } from 'pages/Game';

/* @Machine */
import { gameMachine } from 'machines/game';

const App = () => {
  const [gameState, gameDispatch] = useMachine(gameMachine);
  const history = useHistory();

  const onLoadCards = (cards: GameCard[]) => {
    gameDispatch({
      type: 'SET_CARDS',
      cards,
    });

    history.push('/game');
  };

  return (
    <Switch>
      <Route path="/game">
        <Game state={gameState} dispatcher={gameDispatch} />
      </Route>
      <Route path="/">
        <Start handleLoadCars={onLoadCards} />
      </Route>
    </Switch>
  );
};

export default App;
