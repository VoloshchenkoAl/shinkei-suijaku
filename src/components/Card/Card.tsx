import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';

/* @Machine */
import { cardMachine } from 'machines/card';

/* @Types */
import { CardProps } from './types';

const Card: React.FC<CardProps> = (props) => {
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

  return (
    <div
      style={{
        width: '200px',
        height: '144px',
      }}
      onClick={() => onClick({ id, uniqKey })}
    >
      {state.matches('unguessed') ? (
        <div>xxx</div>
      ) : (
        <div>
          <img
            src={image.link}
            alt={description}
            width="200px"
            height="144px"
          />
          {state.matches('detailed') ? (
            <div>{author.name}</div>
          ) : null}
        </div>
      )}
      <div></div>
    </div>
  );
};

export { Card };
