/* React Scope */
import { useContext } from 'react';
import { GameStateContext } from 'game-provider';
import { useActor } from '@xstate/react';
import { Navigate } from 'react-router-dom';

function GamePage() {
  const { gameService } = useContext(GameStateContext);
  const [state, send] = useActor(gameService);

  if (!state.matches('game')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="text-2xl font-medium mb-4">
        Find all the matching pairs of cards to win the game 🏁
      </h1>
      <div className="grid gap-7 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {state.context.cards.map((card) => (
          <button
            onClick={() => send({ id: card.id, type: 'FLIP_CARD' })}
            key={card.id}
            type="button"
            className="flex overflow-hidden"
          >
            {card.isFlipped && (
              <img
                width="227"
                height="151"
                className="object-cover"
                alt={card.name}
                src={card.thumbnail}
              />
            )}
            {!card.isFlipped && (
              <div
                className="bg-gradient-to-tl from-gray-400 to-green-200"
                style={{ width: '227px', height: '151px' }}
              ></div>
            )}
          </button>
        ))}
      </div>
    </>
  );
}

export default GamePage;
