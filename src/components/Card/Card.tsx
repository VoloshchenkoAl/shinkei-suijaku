import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';

/* @Machine */
import { cardMachine } from 'machines/card';

/* @Types */
import { CardProps } from './types';

/* @Styles */
import './Card.css';

const Card: React.FunctionComponent<CardProps> = (props) => {
  const [state, send] = useMachine(cardMachine);
  const {
    isRevealed,
    image,
    description,
    author,
    id,
    onClick,
    uniqKey,
  } = props;

  useEffect(() => {
    const type = isRevealed ? 'REVEAL' : 'UNGUESSED';
    send({ type });
  }, [isRevealed, send]);

  const handleMouseEnter = () => {
    send({ type: 'DETAIL' });
  };

  const handleMouseLeave = () => {
    send({ type: 'REVEAL_DETAILED' });
  };

  return (
    <div
      className="game-card"
      onClick={() => onClick({ id, uniqKey })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {state.matches('unguessed') ? (
        <div className="game-card__hide" />
      ) : (
        <div className="game-card-info">
          <img src={image.link} alt={description} />
          {state.matches('detailed') ? (
            <div className="game-card-detailed">
              <span>
                {author.name} on <a href={author.link}>Unsplash</a>
              </span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export { Card };
