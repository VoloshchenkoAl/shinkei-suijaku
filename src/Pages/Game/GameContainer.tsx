import React from 'react';

/* @Types */
import { GameState } from 'Machines/game/types';

/* @Components */
import { GameComponent } from './GameComponent';

type GameContainerProps = {
  state: GameState;
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

  return (
    <GameComponent
      cards={cards}
      openedCards={openedCards}
      handleClick={handleClick}
      forceOpenedCards={forceOpenedCards}
      attempts={attempts}
    />
  );
};

export { GameContainer };
