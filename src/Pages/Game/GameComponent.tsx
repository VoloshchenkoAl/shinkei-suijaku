import React from 'react';

/* @Types */
import { GameComponentProps } from './types';

/* @Components */
import { Card } from 'components/Card';

/* @Styles */
import './Game.css';

const GameComponent: React.FunctionComponent<GameComponentProps> = (
  props,
) => {
  const {
    cards,
    openedCards,
    handleClick,
    forceOpenedCards,
    attempts,
  } = props;

  return (
    <section className="game_section">
      <h2>You have {3 - attempts} attempts</h2>
      <section className="game_play">
        {cards.map((card) => (
          <Card
            isRevealed={
              forceOpenedCards ||
              openedCards.some(
                (openedCard) => openedCard.uniqKey === card.uniqKey,
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
