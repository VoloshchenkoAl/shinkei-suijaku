import React from 'react';

/* @Components */
import { Card } from 'components/Card';

type GameComponentProps = {
  cards: GameCard[];
  openedCards: CardImprint[];
  handleClick: (cardImprint: CardImprint) => void;
  forceOpenedCards: boolean;
  attempts: number;
};

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
    <>
      <h2>Failed -- {attempts}</h2>
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
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
    </>
  );
};

export { GameComponent };
