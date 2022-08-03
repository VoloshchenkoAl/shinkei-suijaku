/* React Scope */
import { useContext } from 'react';
import { GameStateContext } from 'game-provider';
import { useActor } from '@xstate/react';
import { Navigate } from 'react-router-dom';

function GamePage() {
  const { gameService } = useContext(GameStateContext);
  const [state] = useActor(gameService);

  if (!state.matches('game')) {
    return <Navigate to="/" />;
  }

  console.log(state);

  return (
    <>
      <h1 className="text-2xl font-medium mb-4">
        Find all the matching pairs of cards to win the game 🏁
      </h1>
      <div className="grid gap-7 grid-cols-4">
        {state.context.cards.map((card) => (
          <button key={card.id} type="button" className="flex overflow-hidden">
            <img
              className="object-cover"
              alt={card.name}
              src={card.thumbnail}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default GamePage;
