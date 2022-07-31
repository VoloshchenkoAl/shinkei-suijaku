import React from 'react';

/* @Components */
import { Card } from 'components/card';

/* @Types */
import { GameComponentProps } from './types';

/* @Styles */
import './game.css';

const GameComponent: React.FunctionComponent<GameComponentProps> = (props) => {
  const {
    cards,
    openedCards,
    handleClick,
    forceOpenedCards,
    attempts,
    countdownTime,
    isCountdownEnd,
  } = props;

  return (
    <section className="game_section">
      {isCountdownEnd && <h2>You have {3 - attempts} attempts</h2>}
      {!isCountdownEnd && <h2>Game start at {countdownTime / 1000} seconds</h2>}
      <section className="game_play">
        {cards.map((card) => (
          <Card
            isRevealed={
              forceOpenedCards ||
              openedCards.some(
                (openedCard) => openedCard.uniqKey === card.uniqKey
              )
            }
            key={card.uniqKey}
            onClick={handleClick}
            {...card}
          />
        ))}
      </section>
    </section>
  );
};

export { GameComponent };
