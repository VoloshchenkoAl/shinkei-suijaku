import { useEffect } from 'react';
import { useMachine } from '@xstate/react';

/* @Machine */
import { cardMachine } from 'machines/card';

/* @Styles */
import './card.css';

type CardProps = GameCard & {
  isRevealed: boolean;
  onClick: (cardImprint: CardImprint) => void;
};

function Card(props: CardProps) {
  const [state, send] = useMachine(cardMachine);
  const { isRevealed, image, description, author, id, onClick, uniqKey } =
    props;

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
    <button
      className="game-card"
      onClick={() => onClick({ id, uniqKey })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
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
    </button>
  );
}

export default Card;
