import React, { useEffect } from 'react';
import { State } from 'xstate';

/* @Components */
import { GameComponent } from './GameComponent';

type GameContainerProps = {
  state: State<
    GameMachineContext,
    GameMachineEvent,
    any,
    { value: any; context: GameMachineContext }
  >;
  dispatcher: (event: GameMachineEvent) => void;
};

const GameContainer: React.FunctionComponent<GameContainerProps> = (
  props,
) => {
  const { state, dispatcher } = props;
  const {
    cards,
    roundMatch,
    openCards,
    forceOpenedCards,
    attempts,
  } = state.context;
  const openedCards: CardImprint[] = Array.from(
    new Set([...roundMatch, ...openCards]),
  );

  const handleClick = (cardImprint: CardImprint) => {
    dispatcher({
      type: 'MATCH',
      cardImprint,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatcher({ type: 'START_GAME' });
    }, 5000);
  }, [dispatcher]);

  return (
    <>
      {state.matches('gameOver') ? (
        <h2>game over</h2>
      ) : state.matches('win') ? (
        <h2>your win</h2>
      ) : (
        <GameComponent
          cards={cards}
          openedCards={openedCards}
          handleClick={handleClick}
          forceOpenedCards={forceOpenedCards}
          attempts={attempts}
        />
      )}
    </>
  );
};

export { GameContainer };
